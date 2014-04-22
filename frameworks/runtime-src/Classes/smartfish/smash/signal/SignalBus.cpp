// Created by Luke on 13-9-27.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "SmashMacros.h"
#include "SignalBus.h"

//NS_SF_BEGIN
//		SignalBus *SignalBus::mInstance = NULL;
//
//		SignalBus::SignalBus( )
//		{
//
//		}
//
//		SignalBus::~SignalBus( )
//		{
//			for ( std::map<std::string, sigslot::_signal_base<sigslot::SIGSLOT_DEFAULT_MT_POLICY> * >::iterator iter = mSignals.begin( ); iter != mSignals.end( ); )
//			{
//				if ( iter->second )
//				{
//					sigslot::_signal_base<sigslot::SIGSLOT_DEFAULT_MT_POLICY> *p = iter->second;
//					delete p;
//				}
//				else
//				{
//					iter++;
//				}
//			}
//			mSignals.clear( );
//		}
//
//		SignalBus *SignalBus::getInstance( )
//		{
//			if ( mInstance == NULL)
//			{
//				mInstance = new SignalBus( );
//			}
//			return mInstance;
//		}
//
//		sigslot::_signal_base<sigslot::SIGSLOT_DEFAULT_MT_POLICY> *SignalBus::getSignal( SignalDescriptor *signalDescriptor )
//		{
//			if ( mSignals.find( signalDescriptor->getName( ) ) == mSignals.end( ) )
//			{
//				mSignals[ signalDescriptor->getName( ) ] = signalDescriptor->getSignal( );
//			}
//			return mSignals[ signalDescriptor->getName( ) ];
//		}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// SignalDescriptor ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//		SignalDescriptor::SignalDescriptor( std::string name, sigslot::_signal_base<sigslot::SIGSLOT_DEFAULT_MT_POLICY> *signal )
//		{
//			m_sName = name;
//			m_pSignal = signal;
//		}
//
//		SignalDescriptor::~SignalDescriptor( )
//		{
//			m_pSignal = NULL;
//		}
//
//		sigslot::_signal_base<sigslot::SIGSLOT_DEFAULT_MT_POLICY> *SignalDescriptor::getSignal( )
//		{
//			return m_pSignal;
//		}
//
//		std::string SignalDescriptor::getName( )
//		{
//			return m_sName;
//		}

//NS_SF_END