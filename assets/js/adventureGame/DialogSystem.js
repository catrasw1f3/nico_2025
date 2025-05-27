class DialogSystem {
  constructor(dialogBoxId, dialogTextId) {
    this.dialogBox = document.getElementById(dialogBoxId);
    this.dialogText = document.getElementById(dialogTextId);
    this.currentDialog = [];
    this.currentIndex = 0;
    this.active = false;
    this.onFinish = null;

    this.dialogBox.addEventListener('click', () => this.nextLine());
  }

  startDialog(dialogLines, onFinishCallback = null) {
    this.currentDialog = dialogLines;
    this.currentIndex = 0;
    this.onFinish = onFinishCallback;
    this.active = true;
    this.dialogBox.style.display = 'block';
    this.showLine();
  }

  showLine() {
    if (this.currentIndex < this.currentDialog.length) {
      this.dialogText.textContent = this.currentDialog[this.currentIndex];
    } else {
      this.endDialog();
    }
  }

  nextLine() {
    this.currentIndex++;
    this.showLine();
  }

  endDialog() {
    this.dialogBox.style.display = 'none';
    this.active = false;
    if (this.onFinish) this.onFinish();
  }

  isActive() {
    return this.active;
  }
}
export default DialogSystem;