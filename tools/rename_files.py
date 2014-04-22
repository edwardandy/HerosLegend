import string, os, sys, fnmatch


filters = ["png", "plist", "xml"]


def collect_files(root, ignoreFolder=[], patterns=[], folder_depth=-1):
    list = []
    depth = folder_depth;
    for file in os.listdir(root):
        if os.path.isdir(os.path.join(root, file)):
            if not file in ignoreFolder:
                if depth == -1:
                    list.extend(collect_files(os.path.join(root, file), ignoreFolder, patterns, depth))
                else:
                    depth -= 1
                    if depth >= 0:
                        list.extend(collect_files(os.path.join(root, file), ignoreFolder, patterns, depth))

        elif os.path.isfile(os.path.join(root, file)):
            extension = os.path.splitext(file)[-1]
            if extension in patterns:
                list.append(os.path.join(root, file))
    return list

def collect_folders(root, ignoreFolder=[], folder_depth=-1):
    list = []
    depth = folder_depth
    for file in os.listdir(root):
        if os.path.isdir(os.path.join(root, file)):
            if not file in ignoreFolder:
                list.append(os.path.join(root, file))
                if depth == -1:
                    list.extend(collect_folders(os.path.join(root, file), ignoreFolder, depth))
                else:
                    depth -= 1
                    if depth > 0:
                        list.extend(collect_folders(os.path.join(root, file), ignoreFolder, depth))
    return list
def rename_files(root, ignoreFolder=[]):
    print "[ rename files ] Begin to rename files"
    for path in collect_folders(root, ignoreFolder, 0):
        list = collect_files(path, [], [".png"], 0)
        for sub_path in list:
            nameArr = os.path.basename(sub_path).split("_")
            dotArr = nameArr[len(nameArr) - 1].split(".")
            os.rename(sub_path, os.path.dirname(sub_path) + os.sep + os.path.basename(path) + "_" + dotArr[0] + ".png")
            # print "rename:" + os.path.dirname(sub_path) + os.sep + os.path.basename(path) + "_" + dotArr[0] + ".png"
    print "[ rename files ] rename files finish"

dir_src = "/Users/chenyonghua/workspace/GameResource/BattalionCommander/20131215/Soldier_PNG/battle"
rename_files(dir_src)
