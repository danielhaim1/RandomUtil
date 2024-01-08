export class RandomDateUtil {
    constructor(parent) {
        this.dateElements = parent.dateElements;
        this.format = "M j, Y";
    }

    setFormat(newFormat) {
        this.format = newFormat;
    }

    getRandomDateInLastSixMonths() {
        const currentDate = new Date();
        const sixMonthsAgo = new Date(
            currentDate.setMonth(currentDate.getMonth() - 6)
        );
        return new Date(
            sixMonthsAgo.getTime() +
                Math.random() * (currentDate.getTime() - sixMonthsAgo.getTime())
        );
    }

    formatDate(date, format) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, weekday: 'long' };
        const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
        const values = parts.reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});

        return format.replace(/(d|j|S|l|D|m|n|F|M|Y|y|a|A|g|h|G|H|i|s|T|c|r|U)/g, match => {
            switch (match) {
                case 'd': return values.day;
                case 'j': return parseInt(values.day, 10);
                case 'S': return this.getOrdinalSuffix(parseInt(values.day, 10));
                case 'l': return values.weekday;
                case 'D': return values.weekday.substring(0, 3);
                case 'm': return values.month;
                case 'n': return parseInt(values.month, 10);
                case 'F': return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                case 'M': return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
                case 'Y': return values.year;
                case 'y': return values.year.substring(2);
                case 'a': return parseInt(values.hour, 10) >= 12 ? 'pm' : 'am';
                case 'A': return parseInt(values.hour, 10) >= 12 ? 'PM' : 'AM';
                case 'g': return parseInt(values.hour, 10) % 12 || 12;
                case 'h': return ('0' + (parseInt(values.hour, 10) % 12 || 12)).slice(-2);
                case 'G': return parseInt(values.hour, 10);
                case 'H': return values.hour;
                case 'i': return values.minute;
                case 's': return values.second;
                case 'T': return /\((.*)\)/.exec(new Date().toString())[1]; // Timezone abbreviation
                case 'c': return date.toISOString();
                case 'r': return date.toUTCString();
                case 'U': return Math.floor(date.getTime() / 1000);
                default: return match;
            }
        });
    }

    getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    randomDate(format) {
        if (this.dateElements && this.dateElements.length > 0) {
            this.dateElements.forEach((timeElement) => {
                const randomDate = this.getRandomDateInLastSixMonths();
                const formattedDate = this.formatDate(randomDate, format);
                timeElement.setAttribute("datetime", randomDate.toISOString());
                timeElement.setAttribute("itemprop", "datePublished");
                timeElement.textContent = formattedDate;
            });
        }
    }

}
