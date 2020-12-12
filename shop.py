class item:
	def __init__(self,rate,qty,name=None):
		self.rate=rate
		self.qty=qty
		self.name=name
	def getAmt(self):
		return round(self.rate*self.qty,2)
	def getRate(self):
		return self.rate
	def getQuantity(self):
		return self.qty
	def getName(self):
		if self.name==None:
			return 'Unamed Item'
		else:
			return self.name 

	def getInfo(self):
		return [self.getName(),self.getRate(),self.getQuantity(),self.getAmt()]
class itemList:
	def __init__(self):
		self.itemList=[]
	def addItem(self,item):
		self.itemList.append(item)
	def getTotal(self):
		total=[x.getAmt() for x in self.itemList]
		return sum(total)
	def __len__(self):
		return len(self.itemList)
	def addAmtPaid(self,payment):
		return payment-self.getTotal()
	def getInfos(self):
		return list(map(lambda x:x.getInfo(),self.itemList))
if __name__ == '__main__':
	a=item(20,10)
	aList=itemList()
	aList.addItem(a)

	print(a.getAmt())
	print(aList.getTotal())
	print(aList.addAmtPaid(500))
	print('length',len(aList))