

export const copyToClipboard = createCopyToClipboardFunction()


function createCopyToClipboardFunction() {
  if (navigator?.clipboard) {
    return (text: string) => navigator.clipboard.writeText(text);
  }
  return async (text: string) => {
    const tmp = document.createElement("TEXTAREA") as HTMLTextAreaElement;
    const focus = document.activeElement as HTMLTextAreaElement;

    tmp.value = text;

    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
    focus.focus();
  };
};