/**
 * Created by chenyonghua on 14-1-8.
 */
var AttackCollisionResponseStrategy = DamageCollisionResponseStrategy.extend( {
    _animationName: null,
    _attackFrame: 1,
    _isAttacking:false,
    ctor: function()
    {
        this._super();
    },
    setAttackAnimation: function( animationName, attackFrame )
    {
        this._animationName = animationName;
        this._attackFrame = attackFrame;
        this._isAttacking = false;
    },
    onCollision: function( collidingObjects )
    {
        if( this._animationName != null )
        {
            var render = this.getOwner().lookupComponent( GameConst.render );
            if( render.getAnimationName() != this._animationName)
            {
                //检测是否有碰到敌方，如果有则开始播放攻击动画
                var numHit = collidingObjects.length;
                for( var i = 0; i < numHit; i++ )
                {
                    if( this.controlStrategy != null && !this.controlStrategy.canDamagerHit( collidingObjects[i] ) )
                    {
                        continue;
                    }
                    var healthComponent = collidingObjects[i].getOwner().lookupComponent( GameConst.health );
                    if( healthComponent != null && !healthComponent.isDead() )
                    {
                        this.getOwner().lookupComponent( GameConst.entityBus ).getSignal( EntitySignals.STARTING_ATTACK ).dispatch();
                        return;
                    }
                }
            }
            else if(render.getCurrentFrame() >= this._attackFrame )
            {
                this._super( collidingObjects );
            }
        }
    }
} )