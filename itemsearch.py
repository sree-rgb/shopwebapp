import csv
def wordMatch(input_word,other_word):
	match=True

	for x in range(len(input_word)):
		if x >= len(other_word):
			match = False
			break;
		elif input_word[x].lower()!=other_word[x].lower() and match == True:
			match = False
			break;

	return match

# def wordMatchtester():
# 	other_word='cat'
# 	input_word=input('Enter word:')

# 	while input_word != 'q':
# 		print(wordMatch(input_word,other_word))
# 		input_word=input('Enterword:')

	print(wordMatch(input_word,other_word))
def csvmatcher(inputword):
	csvfile=open('item.csv','r')
	spamreader = csv.reader(csvfile)
	test_list=list(spamreader)
	matchlist=list(filter(lambda x:wordMatch(inputword,x[0]),test_list))
	return matchlist

if __name__ == '__main__':
	print(csvmatcher('su'))