#!/bin/sh

#  resource_sync.sh
#  illusionlove
#
#  Created by Luke on 11/6/11.
#  Copyright 2011 __MyCompanyName__. All rights reserved.

# currentPath=`pwd`
# echo $currentPath
# path="../Resources/"
# path="$currentPath/../Resources/iPhone_auto_sync/"
# echo $path
# echo `ls -la $path`
# echo ${BUILT_PRODUCTS_DIR}
# echo "targetPath: ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
# rsync -av $path ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}

# rsync -av ../Resources/iPhone_auto_sync/ ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}

#find ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH} -name "*.ccb" | xargs rm -fr
#find ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH} -name "*.ccbproj" | xargs rm -fr
#find ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH} -name "*.ccbresourcelog" | xargs rm -fr

echo "forcing refresh of javascript files..."
echo "target:${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/src"

if [ -d "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/src" ]; then
	rm -r /${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/src
fi
if [ -d "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/hd" ]; then
	rm -r /${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/hd
fi
if [ -d "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/sd" ]; then
	rm -r /${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/sd
fi

cp -R ./src/ ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/src
cp -R ./res/hd/ ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/hd
# cp -R ./res/sd/ ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/sd

find ./frameworks/runtime-src/Classes/scripting -type f -name '*.js' -exec cp {} ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH} \;
find ./res -maxdepth 1 -type f -name '*.js' -exec cp {} ${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH} \;