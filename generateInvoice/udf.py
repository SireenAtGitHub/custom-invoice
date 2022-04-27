from PyPDF2 import PdfFileWriter, PdfFileReader
import os
from django.templatetags.static import static
from reportlab.platypus import Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfbase.ttfonts import TTFont


def register_font():
    pdfmetrics.registerFont(TTFont('CenturyGothicBold', os.path.abspath(os.getcwd() + '/static/CenturyGothicBold.ttf')))
    pdfmetrics.registerFont(
        TTFont('CenturyGothicRegular', os.path.abspath(os.getcwd() + '/static/CenturyGothicRegular.ttf')))
    registerFontFamily('CenturyGothic', normal='CGRegular', bold='CGBold')


def draw_customer_details(canvas, data):
    t = Table(data, colWidths=160, rowHeights=30)
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'CenturyGothicBold'),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('FONTSIZE', (0, 0), (0, -1), 15),
    ]))
    t.wrapOn(canvas, 400, 100)
    t.drawOn(canvas, 418, 625)


def draw_item_table(canvas, item_data):
    t_item = Table(item_data, colWidths=(65, 390, 90), rowHeights=18)
    t_item.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'CenturyGothicRegular'),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('FONTSIZE', (0, 0), (0, -1), 10),
        ('INNERGRID', (0, 0), (-1, -1), 0.25, 'grey'),
        ('BOX', (0, 0), (-1, -1), 0.25, 'grey')
    ]))
    t_item.wrapOn(canvas, 400, 100)
    t_item.drawOn(canvas, 34, 140)
    canvas.setFont("CenturyGothicRegular", 20)
    canvas.drawString(425, 118, 'Total')
    canvas.setFont("CenturyGothicBold", 20)
    canvas.drawString(500, 118, '4000/-')


def rewrite_pdf(packet, response):
    new_pdf = PdfFileReader(packet)
    existing_pdf = PdfFileReader(open(os.getcwd() + static('INVOICE.pdf'), "rb"))
    output = PdfFileWriter()
    page = existing_pdf.getPage(0)
    page.mergePage(new_pdf.getPage(0))
    output.addPage(page)
    output.write(response)
    packet.seek(0)
    return response
