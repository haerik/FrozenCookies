// Add polyfills:
  
(function (global) {
  var global_isFinite = global.isFinite;
  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);

function setOverrides() {
  

  
  logEvent("Load", "Initial Load of Spell Automation. (You should only ever see this once.)");

  FrozenCookies.frequency = 100;



function preferenceParse(setting, defaultVal) {
  var value = localStorage.getItem(setting);
  if (typeof(value) == 'undefined' || value == null || isNaN(Number(value))) {
    value = defaultVal;
    localStorage.setItem(setting, value);
  }
  return Number(value);
}




function autoGSBuy() {
  if (Game.hasBuff('Click frenzy') > 0 || Game.hasBuff('Dragonflight') > 0) {
    if (Game.Upgrades['Golden switch [off]'].unlocked 
        && !Game.Upgrades['Golden switch [off]'].bought) {
      Game.Upgrades['Golden switch [off]'].buy();
    }
  } else if (Game.hasBuff('Frenzy') == 0) {
    if (Game.Upgrades['Golden switch [on]'].unlocked
        && !Game.Upgrades['Golden switch [on]'].bought) {
      Game.CalculateGains(); // Ensure price is updated since Frenzy ended
      Game.Upgrades['Golden switch [on]'].buy();
    }
  }
}

function autoEdifice() {
  if(Game.Objects['Wizard tower'].minigame.magic == Game.Objects['Wizard tower'].minigame.magicM) {
    while (Game.Objects['Chancemaker'].amount >= 400) {
      Game.Objects['Chancemaker'].sell(1);
    }
    Game.Objects['Wizard tower'].minigame.castSpell(Game.Objects['Wizard tower'].minigame.spells['spontaneous edifice'])
  }
}
	
function FCStart() {
  //  To allow polling frequency to change, clear intervals before setting new ones.
  
 
  
  if (FrozenCookies.autoEdificeBot) {
      clearInterval(FrozenCookies.autoEdificeBot);
      FrozenCookies.autoEdificeBot = 0;
  }
  

  FrozenCookies.autoEdificeBot = setInterval(autoEdifice,FrozenCookies.frequency)
  
}
