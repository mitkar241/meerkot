# chatbot
---

## Installation
---
[Rule-based matching](https://spacy.io/usage/rule-based-matching)
[spacy usage](https://spacy.io/usage)

```bash
sudo apt install python3-pip -y
sudo pip3 install -U pip setuptools wheel
sudo pip3 install -U spacy
sudo python3 -m spacy download en_core_web_sm
```

## Download pipeline
---
After installation you typically want to download a trained pipeline. For more info and available packages, see the models directory.
```bash
sudo python3 -m spacy download en_core_web_sm
```

## Developemt
---
When using pip it is generally recommended to install packages in a virtual environment to avoid modifying system state:
```bash
python3 -m venv .env
source .env/bin/activate
pip3 install -U pip setuptools wheel
pip3 install -U spacy
```

## Additional Dependencies
---
spaCy also lets you install extra dependencies by specifying the following keywords in brackets, e.g. spacy[ja] or spacy[lookups,transformers] with multiple comma-separated extras. See the [options.extras_require] section in spaCy's `setup.cfg` for details on what's included.
```bash
pip install spacy[lookups,transformers]
```

## Resource
---
- [ ] [10 Examples of Natural Language Processing in Action](https://monkeylearn.com/blog/natural-language-processing-examples/)
