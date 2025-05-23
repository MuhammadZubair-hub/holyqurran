import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { Platform, PermissionsAndroid, Alert, Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Commonstyle } from '../shared/Style/globalstyle';

//<Image source={require('../../assets/images/quranpic.png')}></Image>

export const generateAndHandlePDF_Juzz = async (juzz, number) => {
    try {
        //Create plain text from juzz array
        const allText = juzz.map((ayah, index) => `${index + 1}. ${ayah.text}`).join('<br/>');


        const htmlContent = `
        <div style="text-align: center;">
    <img src="file:///android_asset/quranpic.png" alt="Header Image" style="width: 150px; height: auto; margin-bottom: 20px;" />
  </div>
      <h1>Juzz Download : ${number}</h1>
      <div style="text-align : right;" >${allText}</div>
    `;

        //  (Android <= 10 only)
        if (Platform.OS === 'android' && Platform.Version <= 29) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'App needs access to save PDF to Downloads folder',
                    buttonPositive: 'OK',
                },
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permission Denied', 'Cannot save file without permission');
                return;
            }
        }


        const pdfFileName = `Juzz_${number}`;
        const pdf = await RNHTMLtoPDF.convert({
            html: htmlContent,
            fileName: pdfFileName,
            directory: 'Documents',
        });

        console.log('PDF created at:', pdf.filePath);


        const destPath =
            Platform.OS === 'android'
                ? `${RNFS.DownloadDirectoryPath}/${pdfFileName}.pdf`
                : `${RNFS.DocumentDirectoryPath}/${pdfFileName}.pdf`;

        await RNFS.copyFile(pdf.filePath, destPath);
        console.log('PDF copied to:', destPath);


        await Share.open({
            url: `file://${destPath}`,
            type: 'application/pdf',
            failOnCancel: false,
        });

        //Alert.alert('Success', 'PDF saved and ready to share.');
        showMessage({
            type: 'success',
            style: Commonstyle.sucsses,
            message: 'Success',
            description: 'PDF saved and ready to share.'
        })

    } catch (error) {
        console.error('PDF Error:', error);
        //Alert.alert('Error', 'Something went wrong:\n' + error.message);
        showMessage({
            type: 'danger',
            style: Commonstyle.error,
            message: 'Error',
            description: `Something went wrong:\n ${error.message}`
        })
    }
};


export const generateAndHandlePDF_Surah = async (surah, number, name) => {
    try {
        //Create plain text from juzz array
        const allText = surah.map((ayah, index) => `${index + 1}. ${ayah.text}`).join('<br/>');


        const htmlContent = `
       <div style="text-align: center;">
            <img src="file:///android_asset/quranpic.png" alt="Header Image" style="width: 150px; height: auto; margin-bottom: 20px;" />
        </div>
      <h1>Surah Download : ${number} - ${name}</h1>
      <div style="text-align : right;" >${allText}</div>
    `;

        //  (Android <= 10 only)
        if (Platform.OS === 'android' && Platform.Version <= 29) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'App needs access to save PDF to Downloads folder',
                    buttonPositive: 'OK',
                },
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permission Denied', 'Cannot save file without permission');
                return;
            }
        }


        const pdfFileName = `Surah_${number}`;
        const pdf = await RNHTMLtoPDF.convert({
            html: htmlContent,
            fileName: pdfFileName,
            directory: 'Documents',
        });

        console.log('PDF created at:', pdf.filePath);


        const destPath =
            Platform.OS === 'android'
                ? `${RNFS.DownloadDirectoryPath}/${pdfFileName}.pdf`
                : `${RNFS.DocumentDirectoryPath}/${pdfFileName}.pdf`;

        await RNFS.copyFile(pdf.filePath, destPath);
        console.log('PDF copied to:', destPath);


        await Share.open({
            url: `file://${destPath}`,
            type: 'application/pdf',
            failOnCancel: false,
        });

        //Alert.alert('Success', 'PDF saved and ready to share.');
        showMessage({
            type: 'success',
            style: Commonstyle.sucsses,
            message: 'Success',
            description: 'PDF saved and ready to share.'
        })

    } catch (error) {
        console.error('PDF Error:', error);
        //Alert.alert('Error', 'Something went wrong:\n' + error.message);
        showMessage({
            type: 'danger',
            style: Commonstyle.error,
            message: 'Error',
            description: `Something went wrong:\n ${error.message}`
        })
    }
};