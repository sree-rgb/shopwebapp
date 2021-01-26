class item:
	"""
	Item object which has a rate and Quantity.Item name is optional
	"""
	id=0
	def __init__(self,rate,qty,name=None):
		self.rate=rate
		self.qty=qty
		self.name=name
		self.tid=item.id
		item.id+=1
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
	def getID(self):
		return self.tid

	def getInfo(self):
		return [self.getName(),self.getRate(),self.getQuantity(),self.getAmt(),self.getID()]
class itemList:
	"""
	Stores a list of items.Items should be added using addItem method.
	"""
	def __init__(self):
		self.item_list=[]
	def addItem(self,item):
		self.item_list.append(item)
	def delItem(self,itemid):

		for x in range(len(self.item_list)):
			if self.item_list[x].getID()==int(itemid):
				self.item_list.pop(x)
				return True 
		return False
	def getTotal(self):
		total=[x.getAmt() for x in self.item_list]
		return sum(total)
	def __len__(self):
		return len(self.item_list)
	def addAmtPaid(self,payment):
		return payment-self.getTotal()
	def getInfos(self):
		return list(map(lambda x:x.getInfo(),self.item_list))
	def clearList(self):
		self.item_list=[]
if __name__ == '__main__':
	a=item(20,10)
	aList=itemList()
	aList.addItem(a)
	aList.delItem(0)
	# print(aList.getTotal())
	# print(aList.addAmtPaid(500))
	print('length',len(aList))