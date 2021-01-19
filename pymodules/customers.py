class customer:
	'''
	Stores customer info	
	'''
	def __init__(self,id1,name,mnum=None,db=None):
		self.id=id1
		self.name=name
		self.mnum=mnum
		self.db=db
	def __repr__(self):
		return 'ID:%d ,name:%s,mnum:%s'%(self.id,self.name,self.mnum)
	def getId(self):
		return self.id
	def getName(self):
		return self.name
	def getMnum(self):
		return self.mnum
	def getInfo(self):
		return  {'id':self.id,'mnum':self.mnum,'name':self.name}
	def update(self,element,value):
		if element =='name':
			self.db.execute(f"UPDATE customerlist SET customer_name = '{value}' WHERE id={self.id};")
			self.db.commit()
		if element =='mnum':
			self.db.execute(f"UPDATE customerlist SET mobile_number = '{value}' WHERE id={self.id};")
			self.db.commit()

class customerList:
	def __init__(self,db):
		self.db=db
		self.customerslist=[]
		self.updateList()
	def getInfolist(self):
		return [x.getInfo() for x in self.customerslist]
	def updateList(self):
		self.customerslist=list(map(lambda x:customer(**{'id1':x[0],'mnum':x[1],'name':x[2],'db':self.db}),self.db.execute('SELECT * FROM customerlist;').fetchall()))
		return True
	def updateCustomer(self,c_id,element,value):
		for x in self.customerslist:
			if x.getId()==c_id:
				x.update(element,value)
		return 'No'
	def delCustomer(self,c_id):
		for x in enumerate(self.customerslist):
			if x[1].getId()==c_id:
				self.customerslist.pop(x[0])
				self.db.execute(f'DELETE  FROM customerlist WHERE id={c_id} ;')
				self.db.commit()
				return 'yes'
		return 'no'
