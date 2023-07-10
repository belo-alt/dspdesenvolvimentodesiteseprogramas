class formSubimit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("Action");
        }
    }
    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }
    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    async senForm() {
        await fetch(this.url, {
            method:"POST",
            headers: {
                "Content-type": "application/json",
                accept: "application/json",
            },
            body:"JSON.stringify(this.getFormObject())",
        });
        this.displaySuccess();
        {   catch (error) {
            this.displayError();
            throw new(error);
        }
        }
    }

    init() {
        if (this.form) this.formButton.addEventListenner("click", () => this.displaySuccess());
        return this;
    } 
} 

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada.</h1>",
    error: "<h1 class='error'>Não foi possivel enviar sua mensagem!</h1>",
});