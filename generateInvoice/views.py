from django.http import HttpResponse
import io
from django.shortcuts import render
from . import udf
from reportlab.pdfgen import canvas


def home(request):
    return render(request, 'base.html')


def invoice(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment;filename="destination.pdf"'
    packet = io.BytesIO()
    can = canvas.Canvas(packet)
    udf.register_font()
    # CUSTOMER DATA
    data = [["24-04-2022"], ["Sireen Gothadiya"], ['+91 97730 55968']]
    udf.draw_customer_details(can, data)
    # ###### NUMBER PLATE #######
    can.setFont("CenturyGothicBold", 14)
    can.drawString(146, 627, 'GJ01MR9060')
    can.line(146, 625, 233, 625)
    # ###### ITEM DATA #######
    item_data = [[1, "Clutch Plate", 250], [2, "Clutch Plate", 250], [3, "Clutch Plate", 250], [4, "Clutch Plate", 250],
                 [5, "Clutch Plate", 250], [6, "Clutch Plate", 250], [7, "Clutch Plate", 250], [8, "Clutch Plate", 250],
                 [9, "Clutch Plate", 250], [10, "Clutch Plate", 250], [11, "Clutch Plate", 250],
                 [12, "Clutch Plate", 250],
                 [13], [14], [15],
                 [16],
                 [17], [18], [19],
                 [20],
                 [21], [22], [23],
                 [24], [25]]
    udf.draw_item_table(can, item_data)
    can.save()
    response = udf.rewrite_pdf(packet, response)
    return response
