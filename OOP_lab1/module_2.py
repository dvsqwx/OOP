import tkinter as tk
from tkinter import ttk
from utils import BaseDialog


class Step2Dialog(BaseDialog):
    def __init__(self, parent):
        super().__init__(parent, "Вікно 2", "300x150")

        label = ttk.Label(self, text="Крок 2 з 2")
        label.pack(expand=True)

        btn_frame = ttk.Frame(self)
        btn_frame.pack(side=tk.BOTTOM, pady=10)

        btn_back = ttk.Button(btn_frame, text="Назад", command=self.on_back)
        btn_back.pack(side=tk.LEFT, padx=5)

        btn_ok = ttk.Button(btn_frame, text="Так", command=self.on_ok)
        btn_ok.pack(side=tk.LEFT, padx=5)

        btn_cancel = ttk.Button(btn_frame, text="Відміна", command=self.destroy)
        btn_cancel.pack(side=tk.LEFT, padx=5)

    def on_back(self):
        self.destroy()
        self.parent.open_step1()

    def on_ok(self):
        self.parent.set_text("module 1: у другому вікні натиснуто [Так]")
        self.destroy()