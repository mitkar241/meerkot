import spacy
import requests
import sys
from spacy.lang.en.stop_words import STOP_WORDS

API_KEY = "XXXX"
MIN_SIMILARITY = 0.75

def updateStopWordsTuple(nlp):
  #nlp.Defaults.stop_words.add("\n")
  separatorArr = ["\n", ",", ".", "?", "(", ")"]
  STOP_WORDS.update(separatorArr)
  # bug is lg - need to set is_stop manually
  for word in STOP_WORDS:
    checkTuple = ()
    if word.isalpha():
      checkTuple = (word, word[0].capitalize(), word.upper())
    else:
      checkTuple = (word)
    for w in checkTuple:
      lex = nlp.vocab[w]
      lex.is_stop = True

def cleanupStopwords(nlp, srcstr):
  cleanedtext = []
  for item in nlp(srcstr):
    if not item.is_stop:
      cleanedtext.append(item.text)
  cleanstr = ' '.join(cleanedtext)
  return cleanstr

"""
"Current weather in a city"
"Is it going to rain in Rome today?"

"Maximum temparature in a city"
"What is maximum temperature in London today?"
"""

def chatbot(statement):
  baseStmtList = getBaseStmtList(statement)
  doc = nlp(statement)
  # Check if City is found in statement
  city = getCityFound(doc)
  if city == "":
    return "You need to tell me a city to check."
  baseFunc = None
  maxSimilarity = 0
  for scenario, value in baseStmtList.items():
    basedoc = nlp(value["stmt"])
    similarity = basedoc.similarity(doc)
    if similarity > maxSimilarity:
      maxSimilarity = similarity
      baseFunc = value["func"]
  # Go for Max similarity
  respStr = getResponse(city, baseFunc)
  if maxSimilarity < MIN_SIMILARITY:
    return "Sorry I couldn't understand. Please rephrase the statement."
  # Return response string
  if respStr is not None:
    return respStr
  else:
    return "Something went wrong."

def getBaseStmtList(statement):
  baseStmtList = {}
  statement = statement.lower()
  if "weather" in statement:
    baseStmtList["weather"] = {
      "func": getWeather,
      "stmt": "Current weather in a city"
    }
  
  if "max" in statement and "temp" in statement:
    baseStmtList["maxtemp"] = {
      "func": getMaxTemp,
      "stmt": "Maximum temperature in a city"
    }
  
  if "min" in statement and "temp" in statement:
    baseStmtList["mintemp"] = {
      "func": getMinTemp,
      "stmt": "Minimum temperature in a city"
    }
  
  return baseStmtList

def getCityFound(doc):
  city = ""
  for ent in doc.ents:
    if ent.label_ == "GPE": # GeoPolitical Entity
      city = ent.text
      break
  return city

def getResponse(city, reqd_func):
  api_url = "http://api.openweathermap.org/data/2.5/weather?q={}&appid={}".format(city, API_KEY)
  response = requests.get(api_url)
  response_dict = response.json()
  # Check response
  if response.status_code == 200:
    reqd_value = reqd_func(city, response_dict)
    return reqd_value
  else:
    print('HTTP {} calling URL [{}]'.format(response.status_code, api_url))
    return None

def getWeather(city, response_dict):
  weather = response_dict["weather"][0]["description"]
  respStr = "In {}, the current weather is: {}".format(city, weather)
  return respStr

def getMaxTemp(city, response_dict):
  maxtemp = response_dict["main"]["temp_max"]
  respStr = "In {}, the maximum temperature is: {}".format(city, maxtemp)
  return respStr

def getMinTemp(city, response_dict):
  mintemp = response_dict["main"]["temp_min"]
  respStr = "In {}, the minimum temperature is: {}".format(city, mintemp)
  return respStr

if __name__ == "__main__":
  nlp = spacy.load("en_core_web_lg")
  updateStopWordsTuple(nlp)
  # Get Query - use CLI
  arglist = sys.argv[1:]
  srcstr = arglist[0]
  # Cleanup statement
  cleanstr = cleanupStopwords(nlp, srcstr)
  #print(cleanstr)
  # Print response
  response = chatbot(srcstr)
  print(response)
