import pandas as pd

import os

df = pd.read_csv("../data/labels.csv")

imagesToLabel = {}

for i, row in df.iterrows():
        imagesToLabel[row['Photo']] = row['Category']+"_"+row['Issue type']

print(imagesToLabel)
        

for (root,dirs,files) in os.walk('../data/images', topdown=True):
        print (files)
        for file in files:
                if file in imagesToLabel:
                    path="../data/format/"+imagesToLabel[file]+"/"
                    os.makedirs(path, mode=0o777, exist_ok=True)
                    os.system("cp " +"../data/images/"+file+" '" +path + "' ")

