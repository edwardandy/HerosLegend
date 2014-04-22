//
// Created by Luke on 14-2-19.
//


#ifndef __ArmatureScene_H_
#define __ArmatureScene_H_

#include "../DisplayObjectScene.h"
#include "../DisplayObjectRenderer.h"

USING_NS_SF;
USING_NS_CC_EXT;

NS_SF_BEGIN

		class ArmatureScene : public DisplayObjectScene
		{
		public:
			ArmatureScene( );

			virtual ~ArmatureScene( );

			virtual void setSceneView( CCNode *sceneView );

		private:
			CCDictionary *m_BatchNodes;
			CCDictionary *m_BatchNodeZOrders;
		protected:
			virtual CCBatchNode *getBatchNode( std::string fileName );

		public:
			virtual void add( DisplayObjectRenderer *renderer );

			virtual void remove( DisplayObjectRenderer *renderer );

			virtual void onFrame( float deltaTime );

			virtual void setBatchNodeZOrder( std::string filename, int zOrder );
		};

		NS_SF_END

#endif //__ArmatureScene_H_
