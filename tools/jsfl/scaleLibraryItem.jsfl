var folderURI=fl.browseForFolderURL("选择需要导出PNG的fla文件的文件夹位置：");
//var folderURI="file:///Macintosh%20HD/Users/chenyonghua/workspace/cocos2d-x/cocos2d-x-2.2.1/projects/SuperCommander/Resources_src/ignore/test";
var fileMask="*.fla";
var folderContents=FLfile.listFolder(folderURI + "/" + fileMask,"files");
var outFolder = folderURI + "/export/";
fl.outputPanel.clear();
if (folderContents) {
    for (var i=0; i < folderContents.length; ++i) {
        var thisFile=folderURI + "/" + folderContents[i];
		//var copyURI = folderURI + "/export/" + folderContents[i].substr(0,folderContents[i].lastIndexOf(".fla")) + ".fla";
        //var thisFolder=folderURI + "/" + folderContents[i].substr(0,folderContents[i].lastIndexOf(".fla")) + "/";
		if (fl.openDocument(thisFile)) {
			if(!FLfile.exists(outFolder))
			{
				FLfile.createFolder(outFolder);
			}
			//alert(thisFolder);
			var doc=fl.getDocumentDOM();
			var items=doc.library.items;
			//fl.trace(items.length);
			for(var j=0;j<items.length;j++){

				//if(items[j].itemType!="movie clip"){
				var item = items[j];
				doc.library.selectItem(item.name);
				doc.library.editItem();
				if(items[j].itemType == "graphic"){
					doc.selectAll();
					doc.scaleSelection(1.5,1.5);//放大两倍
					doc.selectNone();
				}
				else if(items[j].itemType=="movie clip"){
					fl.trace("==========="+item.name+"=============");
					//if(item.name == "SoldierSkeleton")
					//{
						editLayer(doc);
					//}
					fl.trace("========================");
				}
				//doc.exitEditMode();
				//doc.selectAll();
			}
			
			/*doc.selectAll();
			fl.getDocumentDOM().width = Math.floor(fl.getDocumentDOM().selection[0].width);
			fl.getDocumentDOM().height =  Math.floor(fl.getDocumentDOM().selection[0].height);
			fl.getDocumentDOM().moveSelectionBy({x:-fl.getDocumentDOM().selection[0].left,y:-fl.getDocumentDOM().selection[0].top})
			*/
			//doc.library.selectAll();
			doc.save();
			doc.close(false);
        }
    }
}

function editLayer()
{
	var doc=fl.getDocumentDOM();
	var timeline = doc.getTimeline();
	if(timeline.layers.length <= 1)
	{
		return;
	}
	for (var i = timeline.layers.length - 1; i >= 0; i--)
	{
		var layer = timeline.layers[i];
		//fl.trace(layer.name);
		//fl.trace(layer.frames.length);
		for (var j = 0, totalFrames = layer.frames.length; j < totalFrames; j++)
		{
			var frame = layer.frames[j];
			if(j == frame.startFrame)
			{
				//fl.trace("key frame:"+j);
				for(var k=0,len = frame.elements.length;k<len;k++)
				{
					var element = frame.elements[k];
					fl.trace("element.x:"+element.x);
					fl.trace("element.y:"+element.y);
					element.x *= 1.5;
					element.y *= 1.5;
					fl.trace("after element.x:"+element.x);
					fl.trace("after element.y:"+element.y);
					/*if (element.elementType == "movie clip") 
					{
						fl.trace(element.libraryItem.name);
					}*/
				}
			}
		}
	}
}