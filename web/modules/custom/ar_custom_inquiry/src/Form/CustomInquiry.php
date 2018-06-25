<?php

/**
 * @file
 * Contains \Drupal\ar_custom_inquiry\Form\DemoEventDispatchForm.
 */

namespace Drupal\ar_custom_inquiry\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\ar_custom_inquiry\CustomEvent;
use Drupal\node\Entity\Node;


/**
 * Class CustomInquiry.
 *
 * @package Drupal\ar_custom_inquiry\Form
 */
class CustomInquiry extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'custom_inquiry_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['candidate_name'] = array(
      '#type' => 'textfield',
      '#title' => t('Candidate Name:'),
      '#required' => TRUE,
    );
    $form['candidate_mail'] = array(
      '#type' => 'email',
      '#title' => t('Email ID:'),
      '#required' => TRUE,
    );
    $form['candidate_number'] = array (
      '#type' => 'tel',
      '#title' => t('Mobile no'),
    );
    $form['candidate_dob'] = array (
      '#type' => 'date',
      '#title' => t('DOB'),
      '#required' => TRUE,
    );
    $form['candidate_gender'] = array (
      '#type' => 'select',
      '#title' => ('Gender'),
      '#options' => array(
        'Female' => t('Female'),
        'male' => t('Male'),
      ),
    );
    $form['candidate_confirmation'] = array (
      '#type' => 'radios',
      '#title' => ('Are you above 18 years old?'),
      '#options' => array(
        'Yes' =>t('Yes'),
        'No' =>t('No')
      ),
    );
    $form['candidate_copy'] = array(
      '#type' => 'checkbox',
      '#title' => t('Send me a copy of the application.'),
    );
    $form['dispatch'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Dispatch'),
    );
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $name = $form_state->getValue('candidate_name');
    $mail = $form_state->getValue('candidate_mail');
    $number = $form_state->getValue('candidate_number');
    $dob = $form_state->getValue('candidate_dob');
    $gender = $form_state->getValue('candidate_gender');
    $conf = $form_state->getValue('candidate_confirmation');
    $copy = $form_state->getValue('candidate_copy');
    drupal_set_message('Your form has been saved','status');
  }
}
