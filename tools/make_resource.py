__author__ = 'chenyonghua'
import os
import subprocess
import json
import shutil


def execute(cmd):
    msg_in = ''
    try:
        proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout_val, _ = proc.communicate(msg_in)

        return stdout_val
    except IOError as err:
        return None


def delete_file_folder(src):
    if os.path.isfile(src):
        try:
            os.remove(src)
        except:
            pass
    elif os.path.isdir(src):
        for item in os.listdir(src):
            itemsrc = os.path.join(src, item)
            delete_file_folder(itemsrc)
        try:
            os.rmdir(src)
        except:
            pass


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
                    if depth > 0:
                        depth -= 1
                        list.extend(collect_folders(os.path.join(root, file), ignoreFolder, depth))
    return list


def collect_files(root, ignoreFolder=[], patterns=[], folder_depth=-1):
    list = []
    depth = folder_depth
    for file in os.listdir(root):
        if os.path.isdir(os.path.join(root, file)):
            if not file in ignoreFolder:
                if depth == -1:
                    list.extend(collect_files(os.path.join(root, file), ignoreFolder, patterns, depth))
                else:
                    depth -= 1
                    if depth > 0:
                        list.extend(collect_files(os.path.join(root, file), ignoreFolder, patterns, depth))

        elif os.path.isfile(os.path.join(root, file)):
            extension = os.path.splitext(file)[-1]
            if extension in patterns:
                list.append(os.path.join(root, file))
    return list

# rename filename as foldername_0.png
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


def createAnimationDictionary(dir, destination, ignoreFolder=[]):
    dictionary = {}
    for path in collect_folders(dir, ignoreFolder, 0):
        list = collect_files(path, [], [".png"], 0)
        object = {}
        spriteFrames = {}
        frameIndexList = []
        for sub_path in list:
            # print "--" + os.path.basename(sub_path)
            nameArr = os.path.basename(sub_path).split("_")
            dotArr = nameArr[len(nameArr) - 1].split(".")
            frame = int(dotArr[0])
            frameIndexList.append(frame)
            spriteFrames[frame] = os.path.basename(sub_path)

        object["totalFrames"] = len(list)
        object["startFrame"] = min(frameIndexList)
        object["endFrame"] = max(frameIndexList)
        object["spriteFrames"] = spriteFrames
        object["path"] = os.path.abspath(path)
        object["id"] = os.path.basename(path)
        object["texture"] = os.path.relpath(destination, global_destination) + "/" + os.path.basename(dir) + ".png"
        # print json.dumps(object, sort_keys=True, indent=4, separators=(',', ': '))
        dictionary[os.path.basename(path)] = object
    return dictionary


def packResource(root, destination, name, ignoreFolder=[], isSub=True):
    command_string = "texturepacker --smart-update --scale 1 --format cocos2d-original --data " + destination + os.sep + name + ".plist --sheet " + destination + os.sep + name + ".png --max-width 2048 --max-height 2048"
    # command_string = "texturepacker --smart-update --scale 1 --format cocos2d-original --data " + destination + os.sep + name + ".plist --sheet " + destination + os.sep + name + ".pvr.ccz --dither-fs-alpha --opt RGBA4444 --max-width 2048 --max-height 2048"
    if not isSub:
        command_string += " " + root + os.sep + "*.png"
    else:
        for path in collect_folders(root, ignoreFolder):
            command_string += " " + path + os.sep + "*.png"
    p = execute(command_string)
    # print command_string
    print p


def wirteJson(dictionary, destination, name):
    with file(destination + os.sep + name + ".json", "w") as fd:
        fd.write(json.dumps(dictionary))
    # print "[wirteJson] write " + destination + os.sep + "animationJson.json done"


def make_animation(root, destination, ignoreFolder):
    rename_files(root)
    packResource(root, destination, os.path.basename(root))
    dictionary = createAnimationDictionary(root, destination, ignoreFolder)
    wirteJson(dictionary, destination, os.path.basename(root))
    # data_string = json.dumps(diction ary, sort_keys=True, indent=4, separators=(',', ': '))
    # print data_string
    print "=========================== [generate GameConst start]: =========================="
    for key in dictionary:
        print "GameConst.ANI_" + key.upper() + " = \"" + key + "\";"
    print "=========================== [generate GameConst finish]: =========================="


def make_resource(root, destination, ignoreFolders=[], animationFolders=[]):
    print "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    print "[ make_resource ] make_resource begin"
    print "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"

    #delete folder
    delete_file_folder(destination)

    #package png
    for path in collect_folders(root, ignoreFolders, 0):
        if not os.path.basename(path) in animationFolders:
            packResource(os.path.abspath(path), destination, os.path.basename(path), [], False)
        else:
            make_animation(os.path.abspath(path), destination, [])
    print "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    print "[ make_resource ] make_resource done"
    print "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"


def copy_files(root, destination, ignoreFolders=[], patterns=[], folder_depth=-1):
    dictionary = {}
    needCreateConfig = False
    for path in collect_files(root, ignoreFolders, patterns, 1):
        dst = destination + "/" + os.path.relpath(path, root)
        # print path
        # print dst
        if not os.path.exists(destination):
            os.mkdir(destination)
        if not os.path.exists(os.path.dirname(dst)):
            os.mkdir(os.path.dirname(dst))
        extension = os.path.splitext(dst)[-1]
        if extension == ".mp3":
            # print os.path.splitext(os.path.basename(dst))[0]
            # print global_destination
            # print dst
            # print os.path.relpath(dst, global_destination)
            filename = os.path.splitext(os.path.basename(dst))[0]
            dictionary[filename] = os.path.relpath(dst, global_destination)
            needCreateConfig = True
        shutil.copy(path, dst)
    if needCreateConfig:
        wirteJson(dictionary, destination, "config")
    print dictionary


global_destination = "../Resources/hd/"
global_root = "../Resources_src"
global_output_destination = "../Resources/hd/gameres"
#copy xml/json files
make_resource(global_root, global_output_destination, ["ignore"], ["animations"])
copy_files(global_root, global_output_destination, ["ignore"], [".xml", ".json",".png"])





