/**
 * Created by chenyonghua on 14-2-26.
 */
var ParticleTest = cc.Scene.extend( {
    _layer: null,
    ctor: function()
    {
        this._super();

        this._layer = cc.Layer.create();
        this.addChild(this._layer);

        this.testParticle();
    },
    testParticle: function()
    {
        var system = cc.ParticleSystem.create( "posionGas.plist" );
        system.setPosition(200,200);
        this._layer.addChild( system, 10 );
    }
} );