import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Alert } from 'react-native';
import { saveDocuments } from '@react-native-documents/picker';

export const shareJuzz = async (juzz) => {
    console.log('this is')
  const fileName = `Car_${juzz.number}_${car.model}.text`;
  const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  const content = `Juzz Number: ${juzz.number} \n Complete Juzz ${juzz.text}`;

  try {
    await RNFS.writeFile(path, content, 'utf8');
    await Share.open({
      title: 'Share juzz Details',
      url: 'file://' + path,
      type: 'text/plain',
      failOnCancel: false,
    });
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', 'Could not share the file.');
  }
};


 export const downloadJuzzDetails = async (juzz,number) => {
  console.log('the juzz data is :' ,juzz)
    try {
      // Step 1: Create file locally
      const fileName = `Juzz_${number}_${Date.now()}.txt`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      const allText = juzz.map((ayah, index) => `${index + 1}. ${ayah.text}`).join('\n');
      const content = `Juzz Downloaded:\n\n${allText}`;

      await RNFS.writeFile(filePath, content, 'utf8');

      // Step 2: Open save dialog for user to select location
      const result = await saveDocuments({
        sourceUris: ['file://' + filePath],
        copy: true,
        mimeType: 'text/plain',
        fileName,
      });

      if (result.length > 0) {
        Alert.alert('Success', 'File saved successfully!');
      } else {
        Alert.alert('Cancelled', 'User cancelled saving the file.');
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download car details.');
    }
  };