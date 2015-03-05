Ext.define('SenchaProj.view.MainMenu', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: ['Ext.TitleBar','Ext.Video'],
    alias: 'widget.mainmenuview',
    config: {
		tabBarPosition: 'bottom',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Main Menu',
		            items: [
		                {
		                    xtype: 'button',
		                    text: 'Log Off',
		                    itemId: 'logOffButton',
		                    align: 'left'
		                }
		            ]
            },
            {
                title: 'Video',
                iconCls: 'speedometer',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Video Player'
                    },
                    {
                        url      : "resources/media/BigBuck.m4v",
                        posterUrl: 'resources/images/funkydog.jpg',
                        xtype: 'video'
                    }
                ]
            },
            {
                title: 'Web RTC',
                iconCls: 'video',
                scrollable: 'vertical',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'webrtc'
                    }
                ]
            }        
        ],

        listeners: [
        		{
	            	delegate: '#logOffButton',
	            	event: 'tap',
	            	fn: 'onLogOffButtonTap'
        		},
        ]
    },

    onLogOffButtonTap: function () {
        this.fireEvent('onSignOffCommand');
    }
});
