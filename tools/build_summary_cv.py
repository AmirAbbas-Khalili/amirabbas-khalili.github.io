from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
root=Path(__file__).resolve().parents[1]
for name,file in [('CV','arial.ttf'),('CVBold','arialbd.ttf')]:
 pdfmetrics.registerFont(TTFont(name,'C:/Windows/Fonts/'+file))
pdfmetrics.registerFontFamily('CV',normal='CV',bold='CVBold',italic='CV',boldItalic='CVBold')
styles={
 'name':ParagraphStyle('name',fontName='CVBold',fontSize=21,leading=25,textColor=colors.HexColor('#18232e'),spaceAfter=4),
 'sub':ParagraphStyle('sub',fontName='CV',fontSize=10,leading=14,textColor=colors.HexColor('#4b5863'),spaceAfter=5),
 'body':ParagraphStyle('body',fontName='CV',fontSize=10,leading=14,spaceAfter=5,textColor=colors.HexColor('#202a33')),
 'section':ParagraphStyle('section',fontName='CVBold',fontSize=10,leading=14,spaceBefore=8,spaceAfter=4,textColor=colors.HexColor('#243e51')),
 'contact':ParagraphStyle('contact',fontName='CV',fontSize=8.5,leading=12,spaceAfter=3),
}
story=[]
def p(text,style='body'):story.append(Paragraph(text,styles[style]))
def section(title):
 p(title.upper(),'section');story.append(HRFlowable(width='100%',thickness=.4,color=colors.HexColor('#c5cdd3'),spaceAfter=5))
p('Amir Abbas Khalili','name')
p("Master's Student in Smart Building Engineering | Civil Engineering",'sub')
p('<link href="mailto:Amirkhalili.work@gmail.com">Amirkhalili.work@gmail.com</link> | <link href="https://www.linkedin.com/in/amirjas">LinkedIn: amirjas</link> | <link href="https://github.com/Amir-Khalili-Git">GitHub: Amir-Khalili-Git</link>','contact')
section('Research Interests')
p('Three-dimensional lattice metamaterials; vibration reduction and wave propagation; energy absorption; finite element modeling; deep learning for engineering design; sustainable cementitious materials.')
section('Education')
p("<b>Master's in Smart Building Engineering (ongoing)</b><br/>Tarbiat Modares University, Tehran | GPA: 17.96/20 | Class rank: 2 of 12")
p("<b>Bachelor's in Civil Engineering</b><br/>Amirkabir University of Technology | GPA: 15.76/20 | Class rank: 12 of 102")
section("Master's Thesis")
p('<b>Design and Optimization of Three-Dimensional Lattice Structures for Vibration Reduction and Energy Absorption Using Deep Learning</b>')
p('Investigates how cubic lattice geometry influences frequency band gaps and mechanical behavior under compression. The workflow integrates numerical simulation, data analysis, deep learning and experimental validation.')
p('<b>Methods:</b> Python generates graph-based face geometries and complete hollow cubic cells. COMSOL eigenfrequency analysis evaluates band-gap behavior; Abaqus compression simulations provide force-displacement responses for energy absorption, deformation, failure and densification studies.')
p('<b>Data-driven design:</b> Graph neural networks investigate relationships between lattice geometry and band-gap behavior to support geometry recommendations and optimization. Vibration and compression tests on 3D-printed specimens were used to validate numerical models.')
section('Research Experience')
p('<b>Research Assistant | Tarbiat Modares University</b><br/>July 23 - September 23, 2026 | Supervisor: Dr. Morteza Karamooz Mahdiabadi, Assistant Professor of Mechanical Engineering.')
p('Contributed to computational mechanics, numerical modeling and wave propagation in 3D structures, including plasticity and failure modeling in Abaqus/Explicit. Developed step-by-step instructional materials and video tutorials for COMSOL Multiphysics and Abaqus.')
p('<b>Research Collaboration | Advanced Cementitious Materials</b><br/>Self-Healing Concrete: Fibre Reinforcement, Recycled Materials, and Machine Learning - collaborative review in progress.')
p('Contribution: reviewing relevant studies, conducting supporting research and collaborating on the evaluation of reinforcement materials, particularly recycled fibres. Topics include geopolymer and alkali-activated materials, mechanical performance, crack control, durability, sustainability and machine learning for material design.')
story.append(PageBreak())
p('Amir Abbas Khalili','sub')
section('Conference Papers')
p('<b>Design and Analysis of a Novel Three-Dimensional Cubic Cellular Metamaterial for Vibration Reduction</b><br/>Amir Abbas Khalili, Niloofar Rezaeineya and Morteza Karamouz.<br/>15th International Conference on Acoustics and Vibrations, 2025. Accepted and presented in person; paper ID: 1134-ISAV2025. <link href="https://civilica.com/doc/2670134/" color="#243e51">View paper</link>.')
p('Finite element investigation of two cubic cellular metamaterials, comparing dynamic responses and frequency band gaps with related structures.')
p('<b>Modern Methods in Road Pavement and Asphalt</b><br/>Amir Abbas Khalili, Ali Khodaii and Reza Amin.<br/>8th Annual International Congress on Civil Engineering, Architecture and Urban Development, 2022. Accepted and presented as a poster. <link href="https://civilica.com/doc/1656259/" color="#243e51">View paper</link>.')
p('Review of pavement construction techniques, hot and cold recycling, and materials and additives, with emphasis on performance, environmental protection and resource conservation.')
section('Technical Expertise')
p('<b>Engineering methods:</b> Finite element analysis; engineering modeling and simulation; structural design and analysis; geometric optimization; 3D printing and additive manufacturing.')
p('<b>Simulation and design software:</b> COMSOL Multiphysics, SIMULIA Abaqus, AutoCAD, Revit, ETABS, Civil 3D and EPANET.')
p('<b>Programming and data science:</b> Python engineering tool development; engineering data processing and analysis; machine learning and deep learning; SQL; Git and GitHub for version control.')
p('<b>Research skills:</b> Research and development, technical research and documentation, teaching and knowledge sharing, and AI-assisted research workflows.')
section('Teaching & Research Communication')
p('<b>Published engineering tutorials | October 4, 2026</b><br/>Prepared step-by-step educational videos for students, researchers and engineers:')
p('<b>Dispersion Curve:</b> COMSOL wave-vector paths and dispersion analysis for identifying band gaps in 3D lattices. <link href="https://www.youtube.com/watch?v=SBDLAUWbJTk" color="#243e51">Watch tutorial</link>.<br/><b>Transmission Spectrum:</b> COMSOL transmission analysis and its relationship to dispersion curves and band gaps. <link href="https://www.youtube.com/watch?v=RewK1oyje1s" color="#243e51">Watch tutorial</link>.<br/><b>Energy Absorption:</b> Abaqus compression modeling, element deletion and energy absorption curves. <link href="https://www.youtube.com/watch?v=vQLcFcgdPuU" color="#243e51">Watch tutorial</link>.')
p('<b>English teaching:</b> Instruction at a private language institute. Teacher Training Course (TTC), 2024: grade of Excellent; qualified to teach at English language institutes.')
section('Academic Activities & Recognition')
p('<b>Smart Buildings Engineering Scientific Association:</b> Secretary and active member for two years; organized academic meetings and related events, including a seminar on lightweight aggregates and lightweight concrete at Tarbiat Modares University on December 24, 2025.')
p('<b>Third place, first Future Building Competition:</b> National Competition of Designing and Building a Smart School, Architecture category; organized by the Vice Presidency for Science, Technology, and the Knowledge-Based Economy.')
section('English Proficiency')
p('<b>TOEFL: 99/120</b> | September 25, 2022<br/>Reading: 28 | Listening: 28 | Speaking: 20 | Writing: 23')
out=root/'output/pdf/Amir-Abbas-Khalili-CV.pdf'
def footer(canvas,doc):
 canvas.setFont('CV',8);canvas.setFillColor(colors.HexColor('#697581'))
 canvas.drawRightString(A4[0]-42,23,f'{doc.page} / 2')
SimpleDocTemplate(str(out),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=34,bottomMargin=36,title='Amir Abbas Khalili - Academic Curriculum Vitae',author='Amir Abbas Khalili').build(story,onFirstPage=footer,onLaterPages=footer)
from pypdf import PdfReader
r=PdfReader(out)
print('Pages:',len(r.pages))
assert len(r.pages)==2,'Academic CV should be two pages'
text=' '.join(page.extract_text() for page in r.pages)
assert 'Editorial' not in text and 'photo-editing' not in text
