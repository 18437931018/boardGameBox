// TypeScript file
namespace app.werewolves {
    interface IWereNum {
        txt: string
    }
    export class WerewolvesDlg extends ui.Dialog {
        btnModel9: eui.Button;
        btnModel12: eui.Button;
        lblTotal: eui.Label;
        tbrVilligers: eui.TabBar;
        tbrWolves: eui.TabBar;
        TempText: string;
        grpCheck: eui.Group;
        btnStart: eui.Button;
        childrenCreated() {
            super.childrenCreated();
            this.initData();
            this.registerEvent();
            this.updateView();
        }

        dispose() {
            super.dispose();
            this.btnModel9.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnModel9, this);
            this.btnModel12.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnModel12, this);
            this.tbrVilligers.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrVilligersItemTap, this);
            this.tbrWolves.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrWolvesItemTap, this);
            this.grpCheck.$children.forEach(child => {
                child.removeEventListener(eui.UIEvent.CHANGE, this.onCheckChange, this);
            });
            this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartGame, this);
        }

        initData() {
            this.TempText = this.lblTotal.text;
            this.tbrWolves.selectedIndex = 0;
            this.tbrVilligers.selectedIndex = 0;
            manager.werewolves.players = {};
        }

        registerEvent() {
            this.btnModel9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnModel9, this);
            this.btnModel12.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnModel12, this);
            this.tbrVilligers.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrVilligersItemTap, this);
            this.tbrWolves.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTbrWolvesItemTap, this);
            this.grpCheck.$children.forEach(child => {
                child.addEventListener(eui.UIEvent.CHANGE, this.onCheckChange, this);
            });
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStartGame, this);
        }

        onBtnModel9() {
            this.tbrVilligers.selectedIndex = 0;
            this.tbrWolves.selectedIndex = 0;
            this.setSpecialJob(['seer', 'hunter', 'witch']);
            this.updateView();
        }

        onBtnModel12() {
            this.tbrVilligers.selectedIndex = 1;
            this.tbrWolves.selectedIndex = 1;
            this.setSpecialJob(['seer', 'hunter', 'witch', 'idiot']);
            this.updateView();
        }

        onTbrVilligersItemTap(e: eui.ItemTapEvent) {
            this.calPlayModel();
        }

        onTbrWolvesItemTap(e: eui.ItemTapEvent) {
            this.calPlayModel();
        }

        onCheckChange(evt: eui.UIEvent) {
            this.calPlayModel();
        }

        onBtnStartGame() {
            ui.show(CardDlg);
            this.close();
        }

        updateView() {
            this.calPlayModel();
        }

        calPlayModel() {
            let villigers = 0, wolves = 0, specials = 0;
            if (this.tbrVilligers.selectedItem)
                villigers = +((this.tbrVilligers.selectedItem as IWereNum).txt);
            if (this.tbrWolves.selectedItem)
                wolves = +((this.tbrWolves.selectedItem as IWereNum).txt);
            let findSpecials = _.filter(this.grpCheck.$children, (child: eui.CheckBox) => {
                manager.werewolves.players[child.name] = child.selected ? 1 : 0;
                return child.selected == true;
            })
            manager.werewolves.players['Villiger'] = villigers;
            manager.werewolves.players['Wolves'] = wolves;
            this.notifyTotalChange(villigers + wolves + findSpecials.length);
        }

        setSpecialJob(jobs: string[]) {
            for (let i = 0, l = this.tbrVilligers.$children.length; i < l; i++) {
                let child = this.grpCheck.$children[i] as eui.CheckBox;
                child.selected = jobs.indexOf(child.name) > -1;
            }
        }

        notifyTotalChange(total: number) {
            this.lblTotal.text = this.TempText.format(total);
        }
    }
}
