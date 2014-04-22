/**
 * Created by chenyonghua on 13-10-30.
 */

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// IsoScene ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
IsoScene = sf.IsoNode.extend( {
    _isoObjects: null,
    _graph: null,
    _walkList: [],
    isRunning: false,
    _layoutObject:null,
    _tempPoint:null,
    ctor: function()
    {
        cc.associateWithNative(this,sf.IsoNode);
        this._super();
        this._layoutObject  = new sf.SceneLayoutRenderer();
        this._layoutObject.retain();
        this._isoObjects    = [];
        this._walkList      = [];
        this.isRunning      = false;
        this._tempPoint          = new sf.IsoPoint();
        this._tempPoint.retain();
    },
    setSize: function( width, length, height )
    {
        this._super( width, length, height );
        this._graph = new Graph( width, length, 1 );
    },
    getGraph: function()
    {
        return this._graph;
    },
    addIsoNode: function( isoNode, isSortChildren )
    {
        if( this.validatePosition( isoNode ) )
        {
            this._isoObjects.push( isoNode );
            this.getContainer().addChild( isoNode.getContainer(), isoNode.getDepth() )
            isoNode.onAdded();
            this.updateGraph( isoNode, false );
            var argnum = arguments.length;
            switch( argnum )
            {
                case 1:
                    break;
                case 2:
                    if( isSortChildren == true )
                    {
                        this.sortChild(isoNode);
                    }
                    break;
            }
        }
        else
        {
            cc.log( "position conflict" );
        }
    },
    removeIsoNode: function( isoNode, cleanup )
    {
        var index = this._isoObjects.indexOf( isoNode );
        if( index >= 0 )
        {
            this.updateGraph( isoNode, true );
            this._isoObjects.splice( index, 1 );
            this.getContainer().removeChild( isoNode.getContainer(), cleanup );
            isoNode.onRemoved();
        }
    },
    updateGraph: function( isoNode, isRemove )
    {
        var argnum = arguments.length;
        var realRemove = false;
        if( argnum == 2 )
        {
            realRemove = isRemove;
        }

        for( var i = 0; i < isoNode.getWidth(); i++ )
        {
            for( var j = 0; j < isoNode.getLength(); j++ )
            {
                var graphNode = this._graph.nodes[isoNode.getIsoX() + i][isoNode.getIsoY() + j];
                if( isoNode.isWalkable() || isRemove )
                {
                    graphNode.type = GraphNodeType.OPEN;
                }
                else
                {
                    graphNode.type = GraphNodeType.WALL;
                }
            }
        }
    },
    sortChildren: function()
    {
        //sort children's depth
        var startTime = new Date().getTime();
        this._layoutObject.sortChildren( this.getChildren() );
        cc.log( "sort children cost:" + (new Date().getTime() - startTime) );
        for( var key in this._isoObjects )
        {
            var isoNode = this._isoObjects[key];
            if( isoNode )
            {
                isoNode.renderLogic();
            }
        }
    },
    sortChild: function( child )
    {
        this._layoutObject.sortWithTarget( this._isoObjects, child );
        child.renderLogic();
        //spritebatchnode不支持更换层级，所以在这里只能重新再add一遍了。有什么更好的办法吗？
        this.removeIsoNode( child, false );
        this.addIsoNode( child );
    },
    getChildren: function()
    {
        return this._isoObjects;
    },
    validatePosition: function( isoNode )
    {
        //todo
        return true;
    },
    getScreenBounds: function()
    {

    },
    //////////////////////////////////////////////////////// walk ///////////////////////////////////////////////////////////////
    moveTo: function( target, isoX, isoY )
    {
        var start = this.getGraph().nodes[target.getIsoX()][target.getIsoY()];
        var end = this.getGraph().nodes[isoX][isoY];
        target.pathNodes = astar.search( this.getGraph().nodes, start, end );
        target.index = 0;
        this._walkList.push( target );
        if( !this.isRunning )
        {
            cc.Director.getInstance().getScheduler().scheduleUpdateForTarget( this, cc.PRIORITY_SYSTEM, false );
        }
    },
    update: function( dt )
    {
        var len = this._walkList.length;
        for( var i = 0; i < len; ++i )
        {
            var target = this._walkList[i];
            if( target.index >= target.pathNodes.length )
            {
                this.isRunning = false;
                target.pathNodes.length = 0;
                this._walkList.splice( i, 1 );
                if( this._walkList.length == 0 )
                {
                    cc.Director.getInstance().getScheduler().unscheduleUpdateForTarget( this );
                }
                return;
            }
            this.isRunning = true;
            var targetX = target.pathNodes[target.index].x;
            var targetY = target.pathNodes[target.index].y;
            target.index++;
            this._tempPoint.init(targetX, targetY, 0 );
            target.setIsoPosition( this._tempPoint );
            this.sortChild( target );
        }
    }
} );
