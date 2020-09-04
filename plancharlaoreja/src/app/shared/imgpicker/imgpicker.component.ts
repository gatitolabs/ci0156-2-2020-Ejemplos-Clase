import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Platform, LoadingController} from '@ionic/angular';
import {AngularFireStorage} from '@angular/fire/storage';
import {Capacitor, Plugins, CameraSource, CameraResultType} from '@capacitor/core';

@Component({
  selector: 'app-imgpicker',
  templateUrl: './imgpicker.component.html',
  styleUrls: ['./imgpicker.component.scss']
})
export class ImgpickerComponent implements OnInit {
  @ViewChild('filePicker', {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  usePicker = false;
  selectedImage: string;
  imageData: string | File;
  firebaseUrl: string;

  constructor(
    private platform: Platform,
    private firebaseStorage: AngularFireStorage,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
      this.selectedImage = null;
      this.firebaseUrl = null;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 300,
      resultType: CameraResultType.Base64
    })
      .then((image) => {
        this.selectedImage = image.base64String;
        this.imageData = this.selectedImage;
        // ! Algunas veeces Capacitor retorna la foto como una imagen en base64 con el prefijo data:image/jpeg;base64
        // ! y a veces sin el prefijo.  Es por esto que se "borra" y se agrega de nuevo
        this.selectedImage = this.selectedImage.replace('data:image/jpeg;base64,', '');
        this.selectedImage = 'data:image/jpeg;base64,' + this.selectedImage;
      })
      .catch((error) => {
        console.log(error);
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imageData = pickedFile;
    };
    fr.readAsDataURL(pickedFile);
  }

  handleUpload() {
    let imageFile;
    if (typeof this.imageData === 'string') {
      try {
        imageFile = this._base64toBlob(
          this.imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = this.imageData;
    }

    this.loadingCtrl.create({keyboardClose: true, message: 'Subiendo imagen...'}).then((loader) => {
      loader.present();
      const timestamp = new Date().getTime();
      const fileName = `fotos/${timestamp}.jpg`;
      const storageRef = this.firebaseStorage.storage.ref(fileName);
      return storageRef
        .put(imageFile, {contentType: 'image/jpeg'})
        .then(() => {
          return storageRef
            .getDownloadURL()
            .then((url) => {
              this.firebaseUrl = url;
              loader.dismiss();
            })
            .catch((error) => {
              loader.dismiss();
            });
        })
        .catch((error) => {
          loader.dismiss();
        });
    });
  }

  // Convierte un string en Base64 a un Blob de tipo "contentType"
  _base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = window.atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {type: contentType});
  }
}
