<template>
    <div class="home">
        <div class="hello">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
    </div>
</template>


<script>
    import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import CKEditor from '@ckeditor/ckeditor5-vue';

    import * as tf from '@tensorflow/tfjs';

    // Define a model for linear regression.

    export default {
        name: 'testCkeditor',
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            }
        },
        data() {
            return {
                // 编辑器组件需要获取编辑器实例
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {
                    // 可以控制编辑器的提示文本
                    placeholder: this.placeholder,
                }
            }
        },
        beforeCreate() {
            const model = tf.sequential();
            model.add(tf.layers.dense({units: 1, inputShape: [1]}));

            // Prepare the model for training: Specify the loss and the optimizer.
            model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

            // Generate some synthetic data for training.
            const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
            const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

            // Train the model using the data.
            model.fit(xs, ys).then(() => {
                // Use the model to do inference on a data point the model hasn't seen before:
                model.predict(tf.tensor2d([5], [1, 1])).print();
            });
        },
        methods:{

        },
        watch: {
            'value'(val) {
                if (!this.editor) {
                    return
                }

                // 外部内容发生变化时，将新值赋予编辑器
                if (val && val !== this.editorData) {
                    this.editorData = this.value
                }
            },
            'editorData'(val) {
                if (val && val !== this.value) {
                    // 编辑器内容发生变化时，告知外部，实现 v-model 双向监听效果
                    this.$emit('input', val)
                }
            }
        },
        created() {
            // 编辑器组件创建时将外部传入的值直接赋予编辑器
            this.editorData = this.value
        },
        components: {
            // 编辑器组件的局部注册方式
            ckeditor: CKEditor.component
        }
    }
</script>

<style scoped>

</style>