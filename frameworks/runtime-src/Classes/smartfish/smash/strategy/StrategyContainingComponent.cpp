// Created by Luke on 13-8-30.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "StrategyContainingComponent.h"
#include "Strategy.h"

NS_SF_BEGIN
		StrategyContainingComponent::StrategyContainingComponent( )
		{
			m_vStrategies = cocos2d::CCArray::create( );
			m_vStrategies->retain( );
		}

		void StrategyContainingComponent::onAdd( )
		{
			TickedComponent::onAdd( );
			CCObject *object;
			CCARRAY_FOREACH(m_vStrategies, object)
				{
					Strategy *strategy = dynamic_cast<Strategy * >(object);
					if ( strategy )
					{
						strategy->onAdd( );
					}
				}
		}

		void StrategyContainingComponent::onRemove( )
		{
			TickedComponent::onRemove( );
			CCObject *object;
			CCARRAY_FOREACH(m_vStrategies, object)
				{
					Strategy *strategy = dynamic_cast<Strategy * >(object);
					if ( strategy )
					{
						strategy->onRemove( );
					}
				}
		}

		void StrategyContainingComponent::onStop( )
		{
			TickedComponent::onStop( );
		}

		void StrategyContainingComponent::onResume( )
		{
			TickedComponent::onResume( );
		}

		StrategyContainingComponent::~StrategyContainingComponent( )
		{
//			CCLOG("~StrategyContainingComponent");
			if ( m_vStrategies->count( ) > 0 )
			{
				CCObject *object;
				CCARRAY_FOREACH(m_vStrategies, object)
					{
						Strategy *strategy = dynamic_cast<Strategy * >(object);
						strategy->release( );
						m_vStrategies->removeObject( object, true );
					}
			}
			m_vStrategies->release( );
		}

		cocos2d::CCArray *StrategyContainingComponent::getStrategies( )
		{
			return m_vStrategies;
		};

		void StrategyContainingComponent::onTick( float deltaTime )
		{
			TickedComponent::onTick( deltaTime );
			updateTime( deltaTime );
		}

		void StrategyContainingComponent::updateTime( float dt )
		{
			CCObject *object;
			CCARRAY_FOREACH(m_vStrategies, object)
				{
					Strategy *strategy = dynamic_cast<Strategy * >(object);
					if ( strategy )
					{
						strategy->onTick( dt );
						if ( strategy->shouldRemove( ) )
						{
//							CCLOG("[StrategyContainingComponent] remove strategy:%s",strategy->getName( ).c_str( ));
							m_vStrategies->removeObject( strategy, true );
						}
					}
				}
		}

		void StrategyContainingComponent::setOwner( Entity *value )
		{
			EntityComponent::setOwner( value );
			CCObject *object;
			CCARRAY_FOREACH(m_vStrategies, object)
				{
					Strategy *strategy = dynamic_cast<Strategy * >(object);
					strategy->setOwner( this->getOwner( ) );
				}
		}

		void StrategyContainingComponent::add( Strategy *strategy, std::string name )
		{
			if ( m_vStrategies->indexOfObject( strategy ) == UINT_MAX)
			{
				strategy->retain( );
				strategy->setName( name );
				if ( this->isRegister( ) )
				{
					strategy->onAdd( );
				}
				if ( this->getOwner( ) )
				{
					strategy->setOwner( this->getOwner( ) );
				}
				m_vStrategies->addObject( strategy );
			}
		}

		Strategy *StrategyContainingComponent::getStrategy( std::string name )
		{
			CCObject *object;
			CCARRAY_FOREACH(m_vStrategies, object)
				{
					Strategy *strategy = dynamic_cast<Strategy * >(object);
					if ( strategy->getName( ) == name )
					{
						return strategy;
					}
				}
			return NULL;
		}

		NS_SF_END