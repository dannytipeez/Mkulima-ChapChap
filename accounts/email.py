from djoser.email import ActivationEmail


class CustomActivationEmail(ActivationEmail):
    subject = "MkulimaChapChap Activation Email"
    site_name="MkulimaChapChap"
    # template_name = 'accounts/activation.html'