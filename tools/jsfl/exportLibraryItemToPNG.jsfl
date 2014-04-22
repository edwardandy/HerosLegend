var folderURI=fl.browseForFolderURL("选择需要导出PNG的fla文件的文件夹位置：");
//var folderURI="file:///Macintosh%20HD/Users/chenyonghua/workspace/cocos2d-x/cocos2d-x-2.2.1/projects/SuperCommander/Resources_src/ignore/test";
var fileMask="*.fla";
var folderContents=FLfile.listFolder(folderURI + "/" + fileMask,"files");
var outFolder = folderURI + "/export/";
if (folderContents) {
    for (var i=0; i < folderContents.length; ++i) {
        var thisFile=folderURI + "/" + folderContents[i];
        //var thisFolder=folderURI + "/" + folderContents[i].substr(0,folderContents[i].lastIndexOf(".fla")) + "/";
		if (fl.openDocument(thisFile)) {
			if(!FLfile.exists(outFolder))
			{
				FLfile.createFolder(outFolder);
			}
			//alert(thisFolder);
			var doc=fl.getDocumentDOM();
			doc.selectAll();
			var items=doc.library.items;
			//fl.trace(items.length);
			for(var j=0;j<items.length;j++){
				if(items[j].itemType=="movie clip"){
					var itemName=items[j].name;
					var name_str=outFolder+itemName;
					fl.getDocumentDOM().addItem({x:0,y:0}, items[j]);
					fl.getDocumentDOM().selectAll();
					fl.getDocumentDOM().scaleSelection(1,1);//放大两倍
					fl.getDocumentDOM().width = Math.floor(fl.getDocumentDOM().selection[0].width);
					fl.getDocumentDOM().height =  Math.floor(fl.getDocumentDOM().selection[0].height);
					fl.getDocumentDOM().moveSelectionBy({x:-fl.getDocumentDOM().selection[0].left,y:-fl.getDocumentDOM().selection[0].top})
					fl.getDocumentDOM().exportPNG(name_str + ".png", false,true);
					fl.getDocumentDOM().deleteSelection();
					fl.trace(name_str + ".png");
					//alert('保存成功：' + pngName);
				}
			}
			doc.close(false);
        }
    }
}