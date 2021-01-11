from escpos.printer import Usb
import datetime
# lsusb -vvv -d 0456:0808 command to view usb device settings lsusb

""" Seiko Epson Corp. Receipt Printer M129 Definitions (EPSON TM-T88IV) """
p = Usb(0x0456,0x0808,0,in_ep=0x81,out_ep=0x03)

def newprint():
	file=open('address.txt','r')
	date1=datetime.datetime.now()
	date1_text=date1.strftime('%I:%M:%S %p %d %b %Y %a').strip().center(32)
	p.image('gainstores.png')
	addr=(list(map(lambda x:x.strip().center(32),file.readlines())))
	addr.append('\n')
	for x in addr:
		p.text(x)
	p.text('-'*32)
	p.text(date1_text)
	p.text('-'*32)

def printLine(text):
	p.text(text)
	print(text)
def endOfPrint():
	p.cut()

if __name__ == '__main__':
	printLine('sugar         40.0    1.0   40.0')
	endOfPrint()
