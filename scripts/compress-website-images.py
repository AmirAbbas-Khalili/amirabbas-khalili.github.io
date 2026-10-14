from pathlib import Path
from PIL import Image
from io import BytesIO
import re,json,hashlib
root=Path(__file__).resolve().parents[1]
urls=set()
for file in (root/'dist').rglob('*'):
    if file.suffix in ('.html','.css','.js'):
        urls.update(re.findall(r'/images/[A-Za-z0-9_./-]+\.(?:png|jpg|jpeg|webp)',file.read_text(encoding='utf8')))
result=[]; out=root/'public/images/optimized';out.mkdir(exist_ok=True)
for url in sorted(urls):
    source=root/'public'/url.lstrip('/')
    if not source.exists() or source.stat().st_size<160_000 or 'gallery-thumbnails' in url or '/optimized/' in url:continue
    original=source.read_bytes()
    with Image.open(source) as im:
        size=im.size
        im=im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
        best=None;quality=None
        for q in [84,80,76,72,68]:
            b=BytesIO();im.save(b,'WEBP',quality=q,method=6)
            if best is None or len(b.getvalue())<len(best):best=b.getvalue();quality=q
            if len(best)<240_000:break
        if len(best)>len(original)*.92:continue
        filename=source.stem+'-'+hashlib.sha256(original).hexdigest()[:10]+'.webp'
        dest=out/filename;dest.write_bytes(best)
        assert Image.open(dest).size==size
        result.append({'from':url,'to':'/images/optimized/'+filename,'before':len(original),'after':len(best),'width':size[0],'height':size[1],'quality':quality})
for file in (root/'src').rglob('*'):
    if file.suffix in ('.astro','.css','.ts','.md','.json'):
        text=file.read_text(encoding='utf8'); revised=text
        for row in result:revised=revised.replace(row['from'],row['to'])
        if revised!=text:file.write_text(revised,encoding='utf8')
(root/'docs/homepage-previews/image-compression.json').write_text(json.dumps(result,indent=2),encoding='utf8')
print(json.dumps({'images':len(result),'before':sum(r['before'] for r in result),'after':sum(r['after'] for r in result),'largestNew':max(r['after'] for r in result)},indent=2))
