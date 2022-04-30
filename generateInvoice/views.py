import datetime
from datetime import datetime
from django.http import HttpResponse
import io, os
from django.shortcuts import render
from rest_framework.decorators import api_view
from . import udf
from reportlab.pdfgen import canvas


def home(request):
    return render(request, 'base.html')


@api_view(['POST'])
def invoice(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment;filename="destination.pdf"'
    packet = io.BytesIO()
    can = canvas.Canvas(packet)
    udf.register_font()
    # CUSTOMER DATA
    now = datetime.now()
    dt_string = now.strftime("%d-%m-%Y")
    data = [[dt_string], [request.data['cname']],  ["+91 " + request.data['phone']]]
    udf.draw_customer_details(can, data)
    # ###### NUMBER PLATE #######
    can.setFont("CenturyGothicBold", 14)
    can.drawString(146, 627, request.data['number_plate'].upper())
    can.line(146, 625, 233, 625)
    # ###### ITEM DATA #######
    item_data, total = udf.item_data(request.data['items'])
    udf.draw_item_table(can, item_data)
    can.setFont("CenturyGothicRegular", 20)
    can.drawString(425, 118, 'Total')
    can.setFont("CenturyGothicBold", 20)
    can.drawString(500, 118, str(total)+'/-')
    can.save()
    response = udf.rewrite_pdf(packet, response)
    return response
