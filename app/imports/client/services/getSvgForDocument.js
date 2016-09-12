import { contains } from 'mout/array';

const matchExtension = (fileName) => {
    return fileName.match(/\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/);
};

const getExtensionFromFileName = (fileName) => {
    var match = matchExtension(fileName);
    if (match) {
        return match[0];
    }
    // if file.name does not have .[ext] return a default doc
    return _.sample(Partup.helpers.fileUploader.fallbackFileExtensions);
};

const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.GIF', '.JPG', '.JPEG', '.PNG'];
const docExtensions = ['.doc', '.docx', '.rtf', '.pages', '.txt', '.DOC', '.DOCX', '.RTF', '.PAGES', '.TXT'];
const pdfExtensions = ['.pdf', '.PDF'];
const presentationExtensions = ['.pps', '.ppsx', '.ppt', '.pptx', '.PPS', '.PPSX', '.PPT', '.PPTX'];
const fallbackFileExtensions = ['.ai', '.bmp', '.eps', '.psd', '.tiff', '.tif', '.svg', '.key', '.keynote', '.AI', '.BMP', '.EPS', '.PSD', '.TIFF', '.TIF', '.SVG', '.KEY', '.KEYNOTE'];
const spreadSheetExtensions = ['.xls', '.xlsx', '.numbers', '.csv', '.XLS', '.XLSX', '.NUMBERS', '.CSV'];

allowedExtensions = {
    images: imageExtensions,
    docs: _.flatten([
        pdfExtensions,
        docExtensions,
        presentationExtensions,
        fallbackFileExtensions,
        spreadSheetExtensions
    ])
};

/**
 * @param {object} doc - DocumentSchema in /packages/partup-lib/schemas/update.js
 * @returns {string} filename - The svg icon [file.svg | ppt.svg | doc.svg | pdf.svg | xls.svg]
 */
export default function getSvgForDocument(doc) {
    var svgFileName = 'file.svg';

    // if there's extension in the file name
    if (matchExtension(doc.name)) {
        var extension = getExtensionFromFileName(doc.name);

        if (contains(fallbackFileExtensions, extension)) {
            svgFileName = 'file.svg';
        } else if (contains(presentationExtensions, extension)) {
            svgFileName = 'ppt.svg';
        } else if (contains(docExtensions, extension)) {
            svgFileName = 'doc.svg';
        } else if (contains(pdfExtensions, extension)) {
            svgFileName = 'pdf.svg';
        } else if (contains(spreadSheetExtensions, extension)) {
            svgFileName = 'xls.svg';
        }
        // otherwise fallback to file.svg
    } else {
        // if there's no extension in the file name,
        // for example google sheet, google docs or google slide
        // check the mimeType
        if (doc.mimeType) {
            if (doc.mimeType.indexOf('presentation') > -1) {
                svgFileName = 'ppt.svg';
            } else if (doc.mimeType.indexOf('document') > -1) {
                svgFileName = 'doc.svg';
            } else if (doc.mimeType.indexOf('spreadsheet') > -1) {
                svgFileName = 'xls.svg';
            }
        }
    }

    return `/images/documents/${svgFileName}`;
};
