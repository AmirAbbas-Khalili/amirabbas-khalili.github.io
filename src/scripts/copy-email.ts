// Shared by Contact and the footer; each button has its own live confirmation.
document.querySelectorAll<HTMLButtonElement>('[data-email-copy]').forEach(button => {
  const status = button.querySelector<HTMLElement>('[data-email-status]') ?? button.closest('footer')?.querySelector<HTMLElement>('[data-email-status]');
  let timer: ReturnType<typeof setTimeout>;
  button.addEventListener('click', async () => {
    const value = button.dataset.emailCopy;
    if (!value || !status) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement('textarea');
        field.value = value;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        button.focus();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      status.textContent = document.documentElement.lang === 'fa' ? 'نشانی ایمیل رونوشت شد' : 'Email copied';
    } catch {
      status.textContent = document.documentElement.lang === 'fa' ? 'رونوشت‌برداری ممکن نیست. نشانی ایمیل را به‌صورت دستی رونوشت کنید.' : 'Copy unavailable. Select the email address to copy manually.';
    }
    clearTimeout(timer);
    timer = setTimeout(() => { status.textContent = ''; }, 1800);
  });
});
