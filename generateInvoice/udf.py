from PyPDF2 import PdfFileWriter, PdfFileReader
import os
from django.conf import settings
from django.templatetags.static import static
from reportlab.platypus import Table, TableStyle, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfbase.ttfonts import TTFont
from CustomINVOICE.settings import STATIC_ROOT

def register_font():
    pdfmetrics.registerFont(TTFont('CenturyGothicBold', os.path.abspath(os.getcwd() + '//custom-invoice/static/CenturyGothicBold.ttf')))
    pdfmetrics.registerFont(
        TTFont('CenturyGothicRegular', os.path.abspath(os.getcwd() + '//custom-invoice/static/CenturyGothicRegular.ttf')))
    registerFontFamily('CenturyGothic', normal='CGRegular', bold='CGBold')


def draw_customer_details(canvas, data):
    t = Table(data, colWidths=160, rowHeights=30)
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'CenturyGothicBold'),
        ('FONTWEIGHT', (0, 0), (0, -1), 1),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('FONTSIZE', (0, 0), (0, -1), 15),
    ]))
    t.wrapOn(canvas, 400, 100)
    t.drawOn(canvas, 418, 625)


def draw_item_table(canvas, item_data):
    image = Image(os.path.abspath(os.getcwd() + '//custom-invoice/static/1649230731942.png'), height=110, width=146)
    t_image = Table([[image]])
    t_image.wrapOn(canvas, 400, 100)
    t_image.drawOn(canvas, 37, 655)
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


def rewrite_pdf(packet, response):
    new_pdf = PdfFileReader(packet)
    if settings.DEBUG:
        existing_pdf = PdfFileReader(open(os.getcwd() + '/custom-inovoice' + static('invoice.pdf'), "rb"))
    else:
        existing_pdf = PdfFileReader(open(os.path.join(os.getcwd(), STATIC_ROOT, 'generateInvoice/pdf/invoice.pdf'), "rb"))
    output = PdfFileWriter()
    page = existing_pdf.getPage(0)
    page.mergePage(new_pdf.getPage(0))
    output.addPage(page)
    output.write(response)
    packet.seek(0)
    return response


def item_data(charge_str):
    print(len(charge_str))
    print(charge_str)
    main_list = []
    total = 0
    for item in range(1, 26):
        small_list = [item]
        main_list.append(small_list)
    item_list = charge_str.split(" $ ")
    for i in range(len(item_list)):
        s_split = item_list[i].split(" ^ ")
        total = total + int(s_split[1]) if len(s_split) > 1 else total
        for j in s_split:
            main_list[i].append(j)
    return main_list, total
