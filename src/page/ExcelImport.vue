<template>
  <div>
    <h1> Excel Import </h1>
    <form
      id="excelDrag"
      class="import"
      method="post"
      action=""
      enctype="multipart/form-data"
      v-show="show"
    >
      <div class="box__input">
        <input
          id="inputFile"
          class="box__file"
          type="file"
        />
      </div>
    </form>
    <p>
      {{ this.currentFile && this.currentFile.name }}
    </p>
    <button @click="fileUpload"> fileUpload </button>
    <button @click="cancel"> cancel </button>
  </div>
</template>

<script>
// https://css-tricks.com/drag-and-drop-file-uploading/
// https://github.com/SheetJS/js-xlsx
// import XLSX from 'xlsx'
import { fileUpload } from '@/api'

export default {
  name: 'ExcelImport',
  data () {
    return {
      rABS: true, // true: readAsBinaryString ; false: readAsArrayBuffer
      files: [],
      currentFile: null,
      // workbook: null,
      inputFile: null,
      show: true
    }
  },
  methods: {
    handleFile (file) {
      this.currentFile = file
    },
    handleDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      const currentFile = files[0]

      this.handleFile(currentFile)
      // console.log(this.inputFile.files)
      // console.log(typeof this.inputFile.files)

      // console.log(Array.isArray(this.inputFile.files))

      // this.inputFile.files.append(currentFile)
      // this.inputFile.files.push(currentFile)
      // const reader = new FileReader()
      // reader.onload = (e) => {
      //   let data = e.target.result
      //   if (!this.rABS) {
      //     data = new Uint8Array(data)
      //   }
      //   this.workbook = XLSX.read(data, {type: this.rABS ? 'binary' : 'array'})

      //   // const firstSheetName = this.workbook.SheetNames[0]
      //   // console.log(firstSheetName)
      //   // const firstWorksheet = this.workbook.Sheets[firstSheetName]
      //   // console.log(firstWorksheet)
      //   // const dataTest = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 })
      //   // console.log(dataTest)
      // }
      // if (this.rABS) {
      //   reader.readAsBinaryString(currentFile)
      // } else {
      //   reader.readAsArrayBuffer(currentFile)
      // }
    },
    handleChange (e) {
      e.stopPropagation()
      e.preventDefault()

      const currentFile = this.inputFile.files[0]
      this.handleFile(currentFile)
    },
    fileUpload () {
      // postFileUpload
      if (this.currentFile) {
        fileUpload.postFileUpload(this.currentFile)
      }
    },
    cancel () {
      if (this.currentFile) {
        this.currentFile = null
      }

      if (this.inputFile.files.length) {
        this.inputFile.value = null
      }
    }
  },
  mounted () {
    // const isAdvancedUpload = function featureTest () {
    //   const divElem = document.createElement('div')
    //   return (('draggable' in divElem) || ('ondragstart' in divElem && 'ondrop' in divElem)) && 'FormData' in window && 'FileReader' in window
    // }
    const boxElem = document.getElementById('excelDrag')
    boxElem.addEventListener('drop', this.handleDrop, true)

    this.inputFile = document.getElementById('inputFile')
    this.inputFile.addEventListener('change', this.handleChange, true)
  },
  watch: {
    // workbook (newVal) {
    //   console.log('--workbook--')
    //   console.log(newVal)
    // },
    currentFile (newVal) {
      if (newVal) {
        this.show = false
      } else {
        this.show = true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.import {
  width: 100%;
  height: 200px;
  border: 1px solid black;

  .box__input {
    height: 100%;
    width: 100%;

    .box__file {
      height: 100%;
      width: 100%;
    }
  }
  .box__dragndrop,
  .box__uploading,
  .box__success,
  .box__error {
    display: none;
  }

  .box.has-advanced-upload {
    background-color: white;
    outline: 2px dashed black;
    outline-offset: -10px;
  }
  .box.has-advanced-upload .box__dragndrop {
    display: inline;
  }
}
</style>
