import tkinter as tk

import module1
import module2
import module3


class MainApp:
    def __init__(self, root):
        self._root = root
        root.title("Lab 1")
        root.geometry("420x160")
        self._build_menu()
        self._label = tk.Label(root, text="Результат: -", font=("Arial", 13))
        self._label.pack(expand=True)

    def _build_menu(self):
        bar = tk.Frame(self._root)
        bar.pack(side="top", fill="x")
        for title, action in (("робота 1", self._work1), ("робота 2", self._work2)):
            tk.Button(bar, text=title, command=action).pack(side="left", padx=4, pady=4)

    def _show(self, text):
        self._label.config(text=text)

    def _work1(self):
        module1.open_dialog(self._root, self._work1_step2)

    def _work1_step2(self):
        module2.open_dialog(self._root, self._work1,
                            lambda: self._show("робота 1: підтверджено"))

    def _work2(self):
        module3.open_dialog(self._root, lambda group: self._show(f"Група: {group}"))


if __name__ == "__main__":
    root = tk.Tk()
    MainApp(root)
    root.mainloop()