
def getaddr():
	# hardcoded address getter
	file=open('address.txt','r')
	return (list(map(lambda x:x.strip().center(32),file.readlines())))
def poslabels():
	output_string='Item Name'
	nstring='%s %s %s' % ('rate'.rjust(6),'qty'.rjust(6),'amt'.rjust(6))
	gap=' '*(31-len(output_string)-len(nstring))
	bar='\n'+('-'*32)+'\n'
	return output_string+gap+nstring+bar
def poswriter(itemname,rate,qty,amt):
	output_string=itemname[:10]
	next_line=itemname[10:]

	# p q r are spaces between itemname rate and qty
	amt=int(amt)
	rate,qty,amt=tuple(map(lambda x:str(x).rjust(6),(rate,qty,amt)))
	
	nstring='%s %s %s' % (rate,qty,amt)
	gap=' '*(31-len(output_string)-len(nstring))
	output_template='%s%s%s%s\n'
	if next_line:
		output_template='%s-%s%s\n%s\n'
		gap=' '*(30-len(output_string)-len(nstring))
	output_string=output_template % (output_string,gap,nstring,next_line)
	return output_string
def postotal(total):
	output_string=('-'*32)+'\n'
	output_string=output_string+'Total'
	t_string=str(total).rjust(32-len(str(total)))
	output_string=output_string+t_string
	return output_string
if __name__ == '__main__':
	# item1=('rice',60,5,300)
	# item2=('wheat',70,5,350)
	# print(poswriter(*item1))
	# print(poswriter(*item2))
	print(getaddr())
	print(postotal(100))