import tkinter as tk
from tkinter import ttk
from utils import BaseDialog


class Step1Dialog(BaseDialog):
    def __init__(self, parent):
        super().__init__(parent, "Вікно 1", "300x150")

        label = ttk.Label(self, text="Крок 1 з 2")
        label.pack(expand=True)

        btn_frame = ttk.Frame(self)
        btn_frame.pack(side=tk.BOTTOM, pady=10)

        btn_next = ttk.Button(btn_frame, text="Далі", command=self.on_next)
        btn_next.pack(side=tk.LEFT, padx=5)

        btn_cancel = ttk.Button(btn_frame, text="Відміна", command=self.destroy)
        btn_cancel.pack(side=tk.LEFT, padx=5)

    def on_next(self):
        self.destroy()
        self.parent.open_step2()