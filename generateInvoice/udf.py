from PyPDF2 import PdfWriter, PdfReader
import os
from django.conf import settings
from django.templatetags.static import static
from reportlab.platypus import Table, TableStyle, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfbase.ttfonts import TTFont
from CustomINVOICE.settings import PROJECT_NAME


def register_font():
    pdfmetrics.registerFont(
        TTFont(
            "CenturyGothicBold",
            os.path.abspath(
                os.getcwd() + "//" + PROJECT_NAME + "/static/CenturyGothicBold.ttf"
            ),
        )
    )
    pdfmetrics.registerFont(
        TTFont(
            "CenturyGothicRegular",
            os.path.abspath(
                os.getcwd() + "//" + PROJECT_NAME + "/static/CenturyGothicRegular.ttf"
            ),
        )
    )
    registerFontFamily("CenturyGothic", normal="CGRegular", bold="CGBold")


def draw_customer_details(canvas, data):
    t = Table(data, colWidths=160, rowHeights=30)
    t.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (0, -1), "CenturyGothicBold"),
                ("FONTWEIGHT", (0, 0), (0, -1), 1),
                ("ALIGN", (0, 0), (0, -1), "RIGHT"),
                ("FONTSIZE", (0, 0), (0, -1), 15),
            ]
        )
    )
    t.wrapOn(canvas, 400, 100)
    t.drawOn(canvas, 418, 625)


def draw_item_table(canvas, item_data):
    image = Image(
        os.path.abspath(
            os.getcwd() + "//" + PROJECT_NAME + "/static/1649230731942.png"
        ),
        height=110,
        width=146,
    )
    t_image = Table([[image]])
    t_image.wrapOn(canvas, 400, 100)
    t_image.drawOn(canvas, 37, 655)
    t_item = Table(item_data, colWidths=(65, 390, 90), rowHeights=18)
    t_item.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), "CenturyGothicRegular"),
                ("ALIGN", (0, 0), (0, -1), "LEFT"),
                ("FONTSIZE", (0, 0), (0, -1), 10),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, "grey"),
                ("BOX", (0, 0), (-1, -1), 0.25, "grey"),
            ]
        )
    )
    t_item.wrapOn(canvas, 400, 100)
    t_item.drawOn(canvas, 34, 140)


def rewrite_pdf(packet, response):
    new_pdf = PdfReader(packet)
    existing_pdf = PdfReader(
        open(
            os.path.abspath(os.getcwd() + "/" + PROJECT_NAME + "/static/INVOICE.pdf"),
            "rb",
        )
    )
    # if settings.DEBUG:
    #     existing_pdf = PdfFileReader(open(os.getcwd() + '/custom-invoice' + static('invoice.pdf'), "rb"))
    # else:
    #     existing_pdf = PdfFileReader(open(os.path.join(os.getcwd(), STATIC_ROOT, 'generateInvoice/pdf/invoice.pdf'), "rb"))
    output = PdfWriter()
    page = existing_pdf.pages[0]
    page.merge_page(new_pdf.pages[0])
    output.add_page(page)
    output.write(response)
    packet.seek(0)
    return response


def get_service_data(services):
    total = 0
    main_list = [[i] for i in range(1, 26)]
    for i in range(len(services)):
        main_list[i].append(services[i]["serviceName"])
        main_list[i].append(services[i]["serviceCharge"])
        total += services[i]["serviceCharge"]
    return main_list, total
