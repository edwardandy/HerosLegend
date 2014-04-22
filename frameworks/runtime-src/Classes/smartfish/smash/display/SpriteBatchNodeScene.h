// Created by Luke on 13-12-20.
//


#ifndef __SpriteBatchNodeScene_H_
#define __SpriteBatchNodeScene_H_

#include "DisplayObjectScene.h"
#include "DisplayObjectRenderer.h"

USING_NS_SF;

NS_SF_BEGIN

		class SpriteBatchNodeScene : public DisplayObjectScene
		{
		public:
			SpriteBatchNodeScene( );

			virtual ~SpriteBatchNodeScene( );

			virtual void setSceneView( CCNode *sceneView );

		private:
			CCDictionary *m_BatchNodes;
			CCDictionary* m_BatchNodeZOrders;
		protected:
			virtual CCSpriteBatchNode *getSpriteBatchNode( std::string fileName );
		public:
			virtual void add( DisplayObjectRenderer *renderer );

			virtual void remove( DisplayObjectRenderer *renderer );

			virtual void onFrame( float deltaTime );

			virtual void setBatchNodeZOrder(std::string filename,int zOrder);
		};

		NS_SF_END

#endif //__SpriteBatchNodeScene_H_
