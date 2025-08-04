=================================================================
 Disabling multiple selection for the same Payment Method in POS
=================================================================

* Prevents adding the same payment method multiple times in the POS Payment Screen

* Automatically focuses the existing payment line if the user clicks the same payment method again

* Cleans up the duplicated payment lines if they exist (e.g. when navigating back to cart and forth)

* Improves UX by ensuring only one line per payment method is shown

Usage
-----

* Open Main menu → Point of Sale → Start a session

* Add products to cart and go to the Payment screen

* Click the same payment method multiple times

* RESULT: only one payment line is present for the selected method

* If a payment method is already selected, clicking it again will simply focus the existing line

Credits
=======

Contributors
------------

* `Almas Kopeyev <https://github.com/kopeyev>`__

Maintainers
-----------

* `IT-Projects LLC <https://it-projects.info>`__
