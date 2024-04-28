const { UiElement } = require('./js/ui/elements/uiElement');
const { ElementGenerator } = require('./js/ui/elements/elementGenerator');
const { Compass } = require('./js/compass');

class RiseSetElement extends UiElement {
    constructor(app) {
        super(app);
        this.compass = new Compass(this.app);
        this.elementGenerator = new ElementGenerator();
        this.iconName = null;
        this.iconSize = 0;
        this.header = null;
        this.dateObject = null;
        this.angle = 0;
    }

    create() {
        const direction = this.compass.getCardinalDirection(this.angle);

        const headerLabel = this.elementGenerator.generateLabel(this.header, 'margin-bottom-5');
        const dateLabel = this.elementGenerator.generateLabel(this.dateObject.toLocaleDateString());
        const timeLabel = this.elementGenerator.generateLabel(this.dateObject.toLocaleTimeString());
        const datetimeLayout = this.elementGenerator.generateLayout([headerLabel, dateLabel, timeLabel], true, 'padding-top-3');

        const directionNameLabel = this.elementGenerator.generateLabel(direction.name);
        const directionArrowIcon = this.elementGenerator.generateIcon(direction.icon_name, 18);
        const directionAngleLabel = this.elementGenerator.generateLabel(`(${Math.floor(this.angle)}°)`);
        const directionLayout = this.elementGenerator.generateLayout([directionNameLabel, directionArrowIcon, directionAngleLabel], false, 'margin-5');

        const infoLayout = this.elementGenerator.generateLayout([datetimeLayout, directionLayout], true);

        this.actor.add_actor(this.elementGenerator.generateElement(this.iconName, this.iconSize, [infoLayout], 'margin-5', 'margin-5'));
    }
}