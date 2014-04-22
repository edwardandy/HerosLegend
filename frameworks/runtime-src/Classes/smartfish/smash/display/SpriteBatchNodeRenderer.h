// Created by Luke on 13-12-20.
//


#ifndef __SpriteBatchNodeRenderer_H_
#define __SpriteBatchNodeRenderer_H_

#include "DisplayObjectRenderer.h"

USING_NS_SF;
NS_SF_BEGIN
class SpriteBatchNodeRenderer : public DisplayObjectRenderer
{
public:
	SpriteBatchNodeRenderer();
	virtual ~SpriteBatchNodeRenderer();

	virtual void setView( );

	virtual void setSprite( CCSprite* value );

	virtual void addChild( CCNode *child, const char *name );

	virtual void addChild( CCNode *child, const char *name, int zOrder );

	virtual void removeChild( CCNode *child );

	virtual void removeChildByName( const char *name );

	std::string &getTextureFileName( )
	{
		return m_TextureFileName;
	}

	void setTextureFileName( std::string &m_TextureFileName )
	{
		SpriteBatchNodeRenderer::m_TextureFileName = m_TextureFileName;
	}

private:
	std::string m_TextureFileName;
public:
	virtual void onAdd( );
};

NS_SF_END


#endif //__SpriteBatchNodeRenderer_H_
