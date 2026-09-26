import tkinter as tk
from tkinter import ttk

import module_1
import module_2
import module_3


class MainWindow(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Lab1")
        self.geometry("320x220")

        btn_frame = ttk.Frame(self)
        btn_frame.pack(pady=20)

        btn_work1 = ttk.Button(btn_frame, text="module 1", command=self.open_step1)
        btn_work1.pack(side=tk.LEFT, padx=8)

        btn_work2 = ttk.Button(btn_frame, text="module 2", command=self.open_groups)
        btn_work2.pack(side=tk.LEFT, padx=8)

        self.label = ttk.Label(self, text="Оберіть модуль", font=("Arial", 11))
        self.label.pack(expand=True)

        menu_bar = tk.Menu(self)
        menu_bar.add_command(label="module 1", command=self.open_step1)
        menu_bar.add_command(label="module 2", command=self.open_groups)
        self.config(menu=menu_bar)

    def set_text(self, text):
        self.label.config(text=text)

    def open_step1(self):
        module_1.Step1Dialog(self)

    def open_step2(self):
        module_2.Step2Dialog(self)

    def open_groups(self):
        module_3.GroupSelectDialog(self)


if __name__ == "__main__":
    app = MainWindow()
    app.mainloop()