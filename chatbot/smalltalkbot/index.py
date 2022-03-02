from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer, ListTrainer
import json

def getJson():
  data = None
  # Opening JSON file
  fp = open('./custom.json')
  # returns JSON object as
  # a dictionary
  data = json.load(fp)
  # Closing file
  fp.close()
  return data

def exportJson(trainer):
  trainer.export_for_training('./custom.json')

bot = ChatBot('Export Example Bot')

# First, lets train our bot with some data
#trainer = ChatterBotCorpusTrainer(chatbot)

#trainer.train('chatterbot.corpus.english')

trainer = ListTrainer(bot)
data = getJson()
for convo in data["conversations"]:
  trainer.train(convo)

# Now we can export the data to a file
#exportJson(trainer)

name=input("Enter Your Name: ")
print("Welcome! Let me know how can I help you?")
while True:
  request=input(name+':')
  if request=='Bye' or request =='bye':
    print('Bot: Bye')
    break
  else:
    response=bot.get_response(request)
    print('Bot:',response)
