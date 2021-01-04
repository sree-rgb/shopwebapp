from escpos.printer import Usb
# lsusb -vvv -d 0456:0808 command to view usb device settings lsusb

""" Seiko Epson Corp. Receipt Printer M129 Definitions (EPSON TM-T88IV) """
p = Usb(0x0456,0x0808,0,in_ep=0x81,out_ep=0x03)

def newprint():
	p.image('gainstores.png')
	p.text('_'*32)
def printLine(text):
	p.text(text)
	print(text)
def endOfPrint():
	p.cut()

if __name__ == '__main__':
	printLine('sugar         40.0    1.0   40.0')
	endOfPrint()
