
import csv
import re
import sys
import json

def overlappingCount(recipe_ingredients,available_ingredients):
    cnt = 0
    for ingredient in available_ingredients: # available ingredients is global set by request
        if re.search(ingredient,recipe_ingredients,re.IGNORECASE):
            cnt += 1 
    return cnt

def start(available_ingredients):
    with open ("recipes.csv","r",encoding="utf-8") as recipes_csv:
        csv_reader = csv.reader(recipes_csv,delimiter=',')
        line = 0
        counts = []
        for row in csv_reader:
            line +=1
            if line % 100 == 0:
                count = overlappingCount(row[13],available_ingredients) 
                if count > 0:
                    counts.append((row[1],count,row[13])) # row[-1]
            else: continue
    sorted_list = sorted(counts, key= lambda x: x[1])
    final_list = sorted_list[-10:]
    d = {}
    for e in final_list:
        d[e[0]] = e[2]

    output_json = json.dumps(d)
    print(output_json)
if __name__ == "__main__":
    start(sys.argv[1:])

     
