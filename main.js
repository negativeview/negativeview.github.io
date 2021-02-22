(function() {
    if (!window.Worker) {
        alert('This game uses web workers, a somewhat modern (but not really) web feature. You might need to update your browser.');
        return;
    }

    const buildings = [
        {
            label: 'Home',
            icon: {
                color: 'rgb(0, 0, 255)'
            },
            position: {
                x: 50,
                y: 200
            }
        },
        {
            label: 'Power Company',
            icon: {
                color: 'rgb(255, 0, 0)',
            },
            position: {
                x: 100,
                y: 100
            }
        },
    ];

    class Building extends HTMLElement {
        constructor() {
            super();

            const buildingTemplate = document.getElementById('building-template');

            this.attachShadow({mode: 'open'});

            this.shadowRoot.append(buildingTemplate.content.cloneNode(true));

            this.worker = new Worker('building-worker.js');
            this.worker.onmessage = (e) => {
                this.message(e);
            };
        }

        message(e) {
            console.log('building got message', e.data);
        }
    };
    customElements.define('gc-building', Building);

    class Game extends HTMLElement {
        constructor() {
            super();

            const gameTemplate = document.getElementById('game-template');

            this.attachShadow({mode: 'open'});

            this.shadowRoot.append(gameTemplate.content.cloneNode(true));

            this.worker = new Worker('game-worker.js');
            this.worker.onmessage = (e) => {
                this.message(e);
            };

            buildings.forEach(
                (building) => {
                    const building_element = document.createElement('gc-building');
                    building_element.setAttribute('title', building.label);
                    building_element.style.position = 'absolute';
                    building_element.style.backgroundColor = building.icon.color;
                    building_element.style.left = building.position.x + 'px';
                    building_element.style.top = building.position.y + 'px';

                    this.shadowRoot.append(building_element);
                }
            );
        }

        message(e) {
            switch (e.data.type) {
                case 'timeUpdate':
                    this.shadowRoot.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, ' + e.data.light + ')';
                    break;
                default:
                    console.log('game got message', e.data);
                    break;
            }
        }
    }
    customElements.define('gc-game', Game);
})();